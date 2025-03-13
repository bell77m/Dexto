// File: src/routes/index.tsx
import { component$, useSignal, useVisibleTask$, $, useStore, useComputed$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { server$ } from '@builder.io/qwik-city';
import type * as monaco from 'monaco-editor';
import {
    DEFAULT_EXAMPLES,
    FOLDER_MARKER,
    STORAGE_KEY_FILES,
    STORAGE_KEY_LANGUAGE,
    STORAGE_KEY_MAIN_FILE
} from "~/Var_and_Func/constants";
import {runCode} from "~/Var_and_Func/runcode";
import "../Var_and_Func/index";

import { VCManager } from "../../public/imported_rtc/vc";
import VoiceChat from "../components/VoiceChat/VoiceChat";

export default component$(() => {
    // Use useStore for complex state to prevent unnecessary re-renders
    const state = useStore({
        files: DEFAULT_EXAMPLES.javascript,
        mainFile: 'index.js',
        language: 'javascript',
        isRunning: false,
        output: '',
        isSaved: true,
        serverSync: false, // Flag to indicate if we should sync with server
    });

    // Use separate signals for input elements to avoid blinking
    const editorContainerRef = useSignal<Element>();
    const fileName = useSignal<string>('');
    const fileContent = useSignal<string>('');
    const editorInstance = useSignal<any>(null);
    const showCreateFolder = useSignal<boolean>(false);
    const folderPath = useSignal<string>('');
    const newFolderName = useSignal<string>('');
    const showNewFolderInput = useSignal<boolean>(false);
    const showMoveFileDialog = useSignal<boolean>(false);
    const fileToMove = useSignal<string>('');
    const targetFolder = useSignal<string>('');
    const selectedFiles = useSignal<Set<string>>(new Set());
    const showMultiSelectMode = useSignal<boolean>(false);

    // New signals for drag and drop and file import
    const draggingFile = useSignal<string | null>(null);
    const dragOverFolder = useSignal<string | null>(null);
    const fileInputRef = useSignal<HTMLInputElement | null>(null);
    const isUploading = useSignal<boolean>(false);
    const uploadProgress = useSignal<number>(0);

    // Add these new signals after your existing signals
    const showSessionModal = useSignal<boolean>(false);
    const sessionId = useSignal<string>('');
    const isInSession = useSignal<boolean>(false);
    const sessionMode = useSignal<'create' | 'join'>('create');
    const isVoiceChatActive = useSignal<boolean>(false);

    const vcManager = useSignal<VCManager | null>(null);

    // Load saved files from localStorage
    useVisibleTask$(({ track }) => {
        // Load files, main file, and language from localStorage
        const savedFiles = localStorage.getItem(STORAGE_KEY_FILES);
        const savedMainFile = localStorage.getItem(STORAGE_KEY_MAIN_FILE);
        const savedLanguage = localStorage.getItem(STORAGE_KEY_LANGUAGE);
        const serverSyncFlag = localStorage.getItem('server-sync');

        // Initialize state
        if (savedFiles) {
            try {
                state.files = JSON.parse(savedFiles);
            } catch (e) {
                console.error('Failed to parse saved files:', e);
            }
        }

        if (savedMainFile && state.files[savedMainFile]) {
            state.mainFile = savedMainFile;
        } else if (Object.keys(state.files).length > 0) {
            state.mainFile = Object.keys(state.files)[0];
        }

        if (savedLanguage) {
            state.language = savedLanguage;
        }

        // Set server sync flag
        state.serverSync = serverSyncFlag === 'true';

        // If server sync is enabled, load files from server
        if (state.serverSync) {
            loadFilesFromServer();
        }
    }, { strategy: 'document-ready' });
    // Add these new functions before the return statement
// Create a new collaboration session
    const createSession = $(async () => {
        // Generate a random session ID if none is provided
        if (!sessionId.value) {
            sessionId.value = Math.random().toString(36).substring(2, 10);
        }

        // Here you would implement actual session creation logic
        // For now, we'll just set the state
        isInSession.value = true;
        showSessionModal.value = false;

        // Show session ID to user
        alert(`Session created! Share this ID with others: ${sessionId.value}`);
    });

// Join an existing session
    const joinSession = $(async () => {
        if (!sessionId.value) {
            alert('Please enter a session ID to join.');
            return;
        }

        // Here you would implement actual session joining logic
        // For now, we'll just set the state
        isInSession.value = true;
        showSessionModal.value = false;

        alert(`Joined session: ${sessionId.value}`);
    });


    // Save files to localStorage whenever they change
    useVisibleTask$(({ track }) => {
        track(() => state.files);
        track(() => state.mainFile);
        track(() => state.language);
        track(() => state.serverSync);

        // Save current state to localStorage
        localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(state.files));
        localStorage.setItem(STORAGE_KEY_MAIN_FILE, state.mainFile);
        localStorage.setItem(STORAGE_KEY_LANGUAGE, state.language);
        localStorage.setItem('server-sync', state.serverSync.toString());

        state.isSaved = true;
    });

    // Load files from server
    const loadFilesFromServer = $(async () => {
        if (!state.serverSync) return;

        try {
            const serverFiles = await listFilesFromServer();

            // Convert server files to our format
            const newFiles: Record<string, string> = {};

            // First add folder entries
            const folders = new Set<string>();

            serverFiles.forEach((file: string) => {
                if (file.includes('/')) {
                    // Add all parent folders
                    const parts = file.split('/');
                    for (let i = 1; i < parts.length; i++) {
                        const folderPath = parts.slice(0, i).join('/');
                        folders.add(folderPath);
                    }
                }
            });

            // Add folder markers
            folders.forEach(folder => {
                newFiles[folder] = FOLDER_MARKER;
            });

            // Now fetch each file's content
            for (const file of serverFiles) {
                try {
                    const response = await fetch(`http://localhost:12345/files/${file}`);
                    if (response.ok) {
                        const content = await response.text();
                        newFiles[file] = content;
                    }
                } catch (error) {
                    console.error(`Failed to load file ${file}:`, error);
                }
            }

            // Update state if we got files
            if (Object.keys(newFiles).length > 0) {
                state.files = newFiles;

                // If we don't have a main file or it doesn't exist, set one
                if (!state.mainFile || !newFiles[state.mainFile]) {
                    const firstRegularFile = Object.keys(newFiles).find(
                        file => newFiles[file] !== FOLDER_MARKER
                    );

                    if (firstRegularFile) {
                        state.mainFile = firstRegularFile;

                        // Update language based on file extension
                        const ext = firstRegularFile.split('.').pop()?.toLowerCase() || '';
                        switch (ext) {
                            case 'py':
                                state.language = 'python';
                                break;
                            case 'js':
                                state.language = 'javascript';
                                break;
                            case 'go':
                                state.language = 'go';
                                break;
                        }
                    }
                }

                // Update editor content
                if (editorInstance.value && state.mainFile) {
                    editorInstance.value.setValue(state.files[state.mainFile] || '');
                    monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
                }
            }
        } catch (error) {
            console.error('Failed to load files from server:', error);
        }
    });

    // Generate file tree structure
    const fileTree = useComputed$(() => {
        // Get all folder paths from files
        const folders = new Set<string>();

        Object.keys(state.files).forEach(file => {
            if (file.includes('/')) {
                // Add all parent folders
                const parts = file.split('/');
                for (let i = 1; i < parts.length; i++) {
                    const folderPath = parts.slice(0, i).join('/');
                    folders.add(folderPath);
                }
            }
        });

        // Create entries for files and folders
        const fileEntries: {
            path: string;
            isFolder: boolean;
            isEmptyFolder: boolean;
            folder: string;
            name: string;
            depth: number;
        }[] = [];

        // Add folder entries first
        folders.forEach(folder => {
            fileEntries.push({
                path: folder,
                isFolder: true,
                isEmptyFolder: false,
                folder: folder.includes('/') ? folder.substring(0, folder.lastIndexOf('/')) : '',
                name: folder.includes('/') ? folder.substring(folder.lastIndexOf('/') + 1) : folder,
                depth: folder.split('/').length - 1
            });
        });

        // Add empty folder markers
        Object.entries(state.files).forEach(([path, content]) => {
            if (content === FOLDER_MARKER) {
                fileEntries.push({
                    path,
                    isFolder: true,
                    isEmptyFolder: true,
                    folder: path.includes('/') ? path.substring(0, path.lastIndexOf('/')) : '',
                    name: path.includes('/') ? path.substring(path.lastIndexOf('/') + 1) : path,
                    depth: path.split('/').length - 1
                });
            }
        });

        // Add file entries
        Object.entries(state.files).forEach(([path, content]) => {
            if (content !== FOLDER_MARKER) {
                fileEntries.push({
                    path,
                    isFolder: false,
                    isEmptyFolder: false,
                    folder: path.includes('/') ? path.substring(0, path.lastIndexOf('/')) : '',
                    name: path.includes('/') ? path.substring(path.lastIndexOf('/') + 1) : path,
                    depth: path.split('/').length - 1
                });
            }
        });

        // Sort entries - folders first, then alphabetically, then by depth
        fileEntries.sort((a, b) => {
            if (a.isFolder && !b.isFolder) return -1;
            if (!a.isFolder && b.isFolder) return 1;
            if (a.depth !== b.depth) return a.depth - b.depth;
            return a.path.localeCompare(b.path);
        });

        return fileEntries;
    });

    // Generate a list of available folders for moving files
    const availableFolders = useComputed$(() => {
        const folders: string[] = [''];  // Root folder

        // Add all folders from the file tree
        fileTree.value.forEach(entry => {
            if (entry.isFolder) {
                folders.push(entry.path);
            }
        });

        // Sort alphabetically with root folder first
        return folders.sort((a, b) => {
            if (a === '') return -1;
            if (b === '') return 1;
            return a.localeCompare(b);
        });
    });

    // Replace your existing toggleVoiceChat function with this:
    const toggleVoiceChat = $(() => {
        // If voice chat is not active yet, show the VoiceChat component and let it handle the call
        if (!isVoiceChatActive.value) {
            isVoiceChatActive.value = true;
        } else {
            // If voice chat is already active, hide the component (which will clean up and end the call)
            isVoiceChatActive.value = false;
        }
    });

    // Create a new file
    const createNewFile = $(async () => {
        if (!fileName.value) return;

        // Determine the full path (with folder if needed)
        let fullPath = fileName.value;
        if (folderPath.value && showCreateFolder.value) {
            // Ensure folder path is properly formatted
            const formattedPath = folderPath.value.endsWith('/')
                ? folderPath.value
                : `${folderPath.value}/`;

            // Create folder structure if it doesn't exist
            fullPath = `${formattedPath}${fileName.value}`;
        }

        // Check if file already exists
        if (state.files[fullPath]) {
            alert(`File ${fullPath} already exists.`);
            return;
        }

        // Create the file with empty content or provided content
        const content = fileContent.value || '';
        state.files = {
            ...state.files,
            [fullPath]: content
        };

        // Upload to server if server sync is enabled
        if (state.serverSync) {
            try {
                // Create a Blob from the content
                const fileBlob = new Blob([content], { type: 'text/plain' });

                // Create a File object
                const fileObj = new File([fileBlob], fileName.value, { type: 'text/plain' });

                // Determine folder path for server
                const folder = folderPath.value && showCreateFolder.value ? folderPath.value : '';

                // Upload to server
                await uploadFilesToServer([fileObj], folder);
            } catch (error) {
                console.error('Failed to upload new file to server:', error);
                alert(`File created locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        // Set current file
        state.mainFile = fullPath;

        // Determine language based on file extension
        const ext = fullPath.split('.').pop()?.toLowerCase() || '';
        switch (ext) {
            case 'py':
                state.language = 'python';
                break;
            case 'js':
                state.language = 'javascript';
                break;
            case 'go':
                state.language = 'go';
                break;
            default:
                state.language = 'javascript';
        }

        // Update editor if it exists
        if (editorInstance.value) {
            editorInstance.value.setValue(content);
            monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
        }

        // Clear the inputs
        fileName.value = '';
        fileContent.value = '';
        folderPath.value = '';
        showCreateFolder.value = false;
    });

    // Create a new folder
    const createNewFolder = $(async () => {
        if (!newFolderName.value) return;

        // Determine the full path
        let fullPath = newFolderName.value;
        if (folderPath.value) {
            // Ensure folder path is properly formatted
            const formattedPath = folderPath.value.endsWith('/')
                ? folderPath.value
                : `${folderPath.value}/`;

            fullPath = `${formattedPath}${newFolderName.value}`;
        }

        // Check if folder already exists
        if (state.files[fullPath]) {
            alert(`Folder ${fullPath} already exists.`);
            return;
        }

        // Create a marker for the empty folder
        state.files = {
            ...state.files,
            [fullPath]: FOLDER_MARKER
        };

        // Create a placeholder file in the folder for server sync
        if (state.serverSync) {
            try {
                // Create a placeholder file to create the folder on server
                const placeholderFile = new File(
                    ['.folder'],
                    '.folder',
                    { type: 'text/plain' }
                );

                // Upload to server with the folder path
                await uploadFilesToServer([placeholderFile], fullPath);

                // Delete the placeholder file from local state
                const newFiles = { ...state.files };
                delete newFiles[`${fullPath}/.folder`];
                state.files = newFiles;
            } catch (error) {
                console.error('Failed to create folder on server:', error);
                alert(`Folder created locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        // Clear the inputs
        newFolderName.value = '';
        folderPath.value = '';
        showNewFolderInput.value = false;
    });

    // Delete a file or folder
    const deleteFile = $(async (path: string) => {
        const isFolder = state.files[path] === FOLDER_MARKER || fileTree.value.find(entry => entry.path === path)?.isFolder;

        if (isFolder) {
            // For folders, delete all files and subfolders within this path
            if (confirm(`Are you sure you want to delete folder "${path}" and all its contents?`)) {
                const newFiles = { ...state.files };

                // Delete the folder marker if it exists
                delete newFiles[path];

                // Delete all files that start with this path
                Object.keys(newFiles).forEach(file => {
                    if (file === path || file.startsWith(`${path}/`)) {
                        delete newFiles[file];
                    }
                });

                // Delete from server if server sync is enabled
                if (state.serverSync) {
                    try {
                        await deleteFileFromServer(path);
                    } catch (error) {
                        console.error(`Failed to delete folder ${path} from server:`, error);
                        alert(`Folder deleted locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }

                state.files = newFiles;

                // If we deleted the current file's folder, select another file
                if (state.mainFile.startsWith(`${path}/`) || state.mainFile === path) {
                    if (Object.keys(newFiles).length > 0) {
                        state.mainFile = Object.keys(newFiles).find(file => newFiles[file] !== FOLDER_MARKER) || Object.keys(newFiles)[0];
                    }
                }
            }
        } else {
            // For regular files
            if (Object.keys(state.files).filter(file => state.files[file] !== FOLDER_MARKER).length <= 1) {
                alert("Cannot delete the last file. At least one file must remain.");
                return;
            }

            if (confirm(`Are you sure you want to delete "${path}"?`)) {
                // Create a copy of the files object without the file to delete
                const newFiles = { ...state.files };
                delete newFiles[path];

                // Delete from server if server sync is enabled
                if (state.serverSync) {
                    try {
                        await deleteFileFromServer(path);
                    } catch (error) {
                        console.error(`Failed to delete file ${path} from server:`, error);
                        alert(`File deleted locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }

                state.files = newFiles;

                // If we deleted the current file, select another one
                if (path === state.mainFile) {
                    // Find the first non-folder file
                    state.mainFile = Object.keys(newFiles).find(file => newFiles[file] !== FOLDER_MARKER) || Object.keys(newFiles)[0];

                    // Update editor if it exists
                    if (editorInstance.value) {
                        editorInstance.value.setValue(state.files[state.mainFile] || '');

                        // Update language based on new main file
                        const ext = state.mainFile.split('.').pop()?.toLowerCase() || '';
                        switch (ext) {
                            case 'py':
                                state.language = 'python';
                                break;
                            case 'js':
                                state.language = 'javascript';
                                break;
                            case 'go':
                                state.language = 'go';
                                break;
                            default:
                                state.language = 'javascript';
                        }

                        monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
                    }
                }
            }
        }
    });

    // Handle file selection
    const selectFile = $((file: string) => {
        // Don't select folders or folder markers
        if (state.files[file] === FOLDER_MARKER || fileTree.value.find(entry => entry.path === file)?.isFolder) {
            return;
        }

        state.mainFile = file;

        // Determine language based on file extension
        const ext = file.split('.').pop()?.toLowerCase() || '';
        switch (ext) {
            case 'py':
                state.language = 'python';
                break;
            case 'js':
                state.language = 'javascript';
                break;
            case 'go':
                state.language = 'go';
                break;
            default:
                state.language = 'javascript';
        }

        // Update editor if it exists
        if (editorInstance.value) {
            editorInstance.value.setValue(state.files[file] || '');
            monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
        }
    });

    // Load example files for the selected language
    const loadExampleFiles = $(() => {
        if (confirm("This will replace all your current files. Continue?")) {
            const examples = DEFAULT_EXAMPLES[state.language as keyof typeof DEFAULT_EXAMPLES];
            state.files = examples;
            state.mainFile = Object.keys(examples)[0];

            // Update editor if it exists
            if (editorInstance.value) {
                editorInstance.value.setValue(state.files[state.mainFile] || '');
                monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
            }

            // Upload to server if server sync is enabled
            if (state.serverSync) {
                // Clear the uploads first
                alert("Server sync is enabled. The examples will be loaded locally but not synced to the server. To upload these files to the server, you'll need to do it manually.");
            }
        }
    });

    // Toggle file selection for multiple file operations
    const toggleFileSelection = $((filePath: string) => {
        const newSelection = new Set(selectedFiles.value);

        if (newSelection.has(filePath)) {
            newSelection.delete(filePath);
        } else {
            newSelection.add(filePath);
        }

        selectedFiles.value = newSelection;
    });

    // Initiate multi-file move dialog
    const initiateMultiFileMoveDialog = $(() => {
        if (selectedFiles.value.size === 0) {
            alert("Please select at least one file to move.");
            return;
        }

        showMoveFileDialog.value = true;
    });

    // Handle moving files between folders
    const moveFile = $(async () => {
        if (!fileToMove.value || targetFolder.value === undefined) return;

        // Get the filename without path
        const fileName = fileToMove.value.includes('/')
            ? fileToMove.value.substring(fileToMove.value.lastIndexOf('/') + 1)
            : fileToMove.value;

        // Create the new path
        const newPath = targetFolder.value ? `${targetFolder.value}/${fileName}` : fileName;

        // Check if target file already exists
        if (state.files[newPath]) {
            alert(`A file named ${fileName} already exists in the target folder.`);
            return;
        }

        // Create a copy of the files object
        const newFiles = { ...state.files };

        // Copy the file content to the new location
        newFiles[newPath] = newFiles[fileToMove.value];

        // Delete the old file
        delete newFiles[fileToMove.value];

        // Move file on server if server sync is enabled
        if (state.serverSync) {
            try {
                await moveFileOnServer(fileToMove.value, newPath);
            } catch (error) {
                console.error(`Failed to move file from ${fileToMove.value} to ${newPath} on server:`, error);
                alert(`File moved locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        // Update the files object
        state.files = newFiles;

        // If we moved the current file, update mainFile
        if (fileToMove.value === state.mainFile) {
            state.mainFile = newPath;

            // Update editor if it exists
            if (editorInstance.value) {
                editorInstance.value.setValue(state.files[newPath] || '');
            }
        }

        // Clear the inputs and close the dialog
        fileToMove.value = '';
        targetFolder.value = '';
        showMoveFileDialog.value = false;
    });

    // Enhanced moveFile function to support multiple files
    const moveFiles = $(async () => {
        if (!targetFolder.value || selectedFiles.value.size === 0) return;

        // Create a copy of the files object
        const newFiles = { ...state.files };
        let newMainFile = state.mainFile;

        // Process each selected file
        for (const filePath of selectedFiles.value) {
            // Skip folders
            if (state.files[filePath] === FOLDER_MARKER || fileTree.value.find(entry => entry.path === filePath)?.isFolder) {
                continue;
            }

            // Get the filename without path
            const fileName = filePath.includes('/')
                ? filePath.substring(filePath.lastIndexOf('/') + 1)
                : filePath;

            // Create the new path
            const newPath = targetFolder.value ? `${targetFolder.value}/${fileName}` : fileName;

            // Check if target file already exists
            if (newFiles[newPath]) {
                // Skip this file and continue with others
                console.warn(`A file named ${fileName} already exists in the target folder. Skipping.`);
                continue;
            }

            // Copy the file content to the new location
            newFiles[newPath] = newFiles[filePath];

            // Delete the old file
            delete newFiles[filePath];

            // Move file on server if server sync is enabled
            if (state.serverSync) {
                try {
                    await moveFileOnServer(filePath, newPath);
                } catch (error) {
                    console.error(`Failed to move file from ${filePath} to ${newPath} on server:`, error);
                    console.warn(`File moved locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
                    // Continue with other files
                }
            }

            // If we moved the current file, update our tracking
            if (filePath === state.mainFile) {
                newMainFile = newPath;
            }
        }

        // Update the files object
        state.files = newFiles;

        // Update mainFile if it was moved
        if (state.mainFile !== newMainFile) {
            state.mainFile = newMainFile;

            // Update editor if it exists
            if (editorInstance.value) {
                editorInstance.value.setValue(state.files[newMainFile] || '');
            }
        }

        // Clear the selection and close the dialog
        selectedFiles.value = new Set();
        targetFolder.value = '';
        showMoveFileDialog.value = false;
        showMultiSelectMode.value = false;
    });

    // Initiate the file move dialog
    const initiateFileMoveDialog = $((file: string) => {
        // Don't allow moving folders for simplicity
        if (state.files[file] === FOLDER_MARKER || fileTree.value.find(entry => entry.path === file)?.isFolder) {
            alert("Moving folders is not supported. Please move individual files.");
            return;
        }

        fileToMove.value = file;
        showMoveFileDialog.value = true;
    });

    // Handle drag start
    const handleDragStart = $((event: DragEvent, filePath: string) => {
        // Don't allow dragging folders
        if (state.files[filePath] === FOLDER_MARKER || fileTree.value.find(entry => entry.path === filePath)?.isFolder) {
            event.preventDefault();
            return;
        }

        draggingFile.value = filePath;

        // Set drag data
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', filePath);
            event.dataTransfer.effectAllowed = 'move';
        }
    });

    // Handle drag over
    const handleDragOver = $((event: DragEvent, folderPath: string | null = null) => {
        event.preventDefault();
        dragOverFolder.value = folderPath;

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    });

    // Handle drag end
    const handleDragEnd = $(() => {
        draggingFile.value = null;
        dragOverFolder.value = null;
    });

    // Handle drop
    const handleDrop = $(async (event: DragEvent, targetFolder: string | null = null) => {
        event.preventDefault();

        // Handle file being dragged from within the app
        if (draggingFile.value) {
            // Get the filename without path
            const fileName = draggingFile.value.includes('/')
                ? draggingFile.value.substring(draggingFile.value.lastIndexOf('/') + 1)
                : draggingFile.value;

            // Create the new path
            const newPath = targetFolder ? `${targetFolder}/${fileName}` : fileName;

            // Don't do anything if dropped in the same location
            if (newPath === draggingFile.value) {
                draggingFile.value = null;
                dragOverFolder.value = null;
                return;
            }

            // Check if target file already exists
            if (state.files[newPath]) {
                alert(`A file named ${fileName} already exists in the target folder.`);
                draggingFile.value = null;
                dragOverFolder.value = null;
                return;
            }

            // Create a copy of the files object
            const newFiles = { ...state.files };

            // Copy the file content to the new location
            newFiles[newPath] = newFiles[draggingFile.value];

            // Delete the old file
            delete newFiles[draggingFile.value];

            // Move file on server if server sync is enabled
            if (state.serverSync) {
                try {
                    await moveFileOnServer(draggingFile.value, newPath);
                } catch (error) {
                    console.error(`Failed to move file from ${draggingFile.value} to ${newPath} on server:`, error);
                    alert(`File moved locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
                }
            }

            // Update the files object
            state.files = newFiles;

            // If we moved the current file, update mainFile
            if (draggingFile.value === state.mainFile) {
                state.mainFile = newPath;

                // Update editor if it exists
                if (editorInstance.value) {
                    editorInstance.value.setValue(state.files[newPath] || '');
                }
            }
        }
        // Handle files being imported from the user's computer
        else if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            await handleFileImport(event.dataTransfer.files, targetFolder);
        }

        // Reset drag state
        draggingFile.value = null;
        dragOverFolder.value = null;
    });

    // Helper function to read a file as text
    const readFileAsText = $(async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    });

    // Handle file import from system
    const handleFileImport = $(async (files: FileList, targetFolder: string | null = null) => {
        if (files.length === 0) return;

        // Set uploading state
        isUploading.value = true;
        uploadProgress.value = 0;

        const totalFiles = files.length;

        let importedCount = 0;
        const readFile = async (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsText(file);
            });
        };
        // Process each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Create the file path
            const filePath = targetFolder ? `${targetFolder}/${file.name}` : file.name;

            // Check if file already exists
            if (state.files[filePath]) {
                if (!confirm(`File ${filePath} already exists. Overwrite?`)) {
                    // Skip this file
                    importedCount++;
                    uploadProgress.value = Math.floor((importedCount / totalFiles) * 100);
                    continue;
                }
            }

            try {
                // Read the file content
                const content = await readFileAsText(file);

                // Add to local files
                state.files = {
                    ...state.files,
                    [filePath]: content
                };

                // Upload to server if server sync is enabled
                if (state.serverSync) {
                    try {
                        await uploadFilesToServer([file], targetFolder || undefined);
                    } catch (error) {
                        console.error(`Failed to upload file ${file.name} to server:`, error);
                        alert(`File imported locally but failed to sync with server: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }

                // If this is the first file, set as main
                if (Object.keys(state.files).filter(f => state.files[f] !== FOLDER_MARKER).length === 1) {
                    state.mainFile = filePath;

                    // Determine language based on file extension
                    const ext = file.name.split('.').pop()?.toLowerCase() || '';
                    switch (ext) {
                        case 'py':
                            state.language = 'python';
                            break;
                        case 'js':
                            state.language = 'javascript';
                            break;
                        case 'go':
                            state.language = 'go';
                            break;
                        default:
                            state.language = 'javascript';
                    }

                    // Update editor if it exists
                    if (editorInstance.value) {
                        editorInstance.value.setValue(content);
                        monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
                    }
                }
            } catch (error) {
                console.error(`Error reading file ${file.name}:`, error);
                alert(`Failed to import ${file.name}: ${error instanceof Error ? error.message : String(error)}`);
            }

            // Update progress
            importedCount++;
            uploadProgress.value = Math.floor((importedCount / totalFiles) * 100);
        }

        // Reset uploading state
        isUploading.value = false;
    });
    const handleFileSelect = $(async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            await handleFileImport(target.files);
            // Reset the input value so the same file can be selected again
            target.value = '';
        }
    });
    // Open file picker dialog
    const openFilePicker = $(() => {
        if (fileInputRef.value) {
            fileInputRef.value.click();
        }
    });



    // Toggle server sync mode
    const toggleServerSync = $(() => {
        state.serverSync = !state.serverSync;

        if (state.serverSync) {
            // If enabling server sync, load files from server
            loadFilesFromServer();
        }
    });

    // Run the code
    const runCurrentCode = $(async () => {
        try {
            // Ensure we have the latest content from the editor
            if (editorInstance.value) {
                state.files[state.mainFile] = editorInstance.value.getValue();
            }

            state.isRunning = true;
            state.output = 'Running...';

            // Remove folder markers before sending to server
            const filesToRun = { ...state.files };
            Object.keys(filesToRun).forEach(file => {
                if (filesToRun[file] === FOLDER_MARKER) {
                    delete filesToRun[file];
                }
            });

            // Call the server function
            const result = await runCode(filesToRun, state.language, state.mainFile);
            state.output = result;
        } catch (error) {
            state.output = `Error: ${error instanceof Error ? error.message : String(error)}`;
        } finally {
            state.isRunning = false;
        }
    });

    // Initialize Monaco editor only once
    useVisibleTask$(({ track, cleanup }) => {
        track(() => editorContainerRef.value);

        if (!editorContainerRef.value) return;

        let editor: monaco.editor.IStandaloneCodeEditor;
        let monaco: typeof import('monaco-editor');

        // Only initialize Monaco once
        if (!editorInstance.value) {
            // Import Monaco editor
            import('monaco-editor').then((monacoModule) => {
                monaco = monacoModule;

                // Create editor with initial content
                editor = monaco.editor.create(editorContainerRef.value!, {
                    value: state.files[state.mainFile] || '',
                    language: state.language,
                    theme: 'vs-dark',
                    automaticLayout: true,
                    minimap: {
                        enabled: false
                    }
                });

                // Store editor instance
                editorInstance.value = editor;

                // Update files when editor changes
                editor.onDidChangeModelContent(() => {
                    // Update the current file's content
                    state.files[state.mainFile] = editor.getValue();
                    state.isSaved = false;
                });

                // Set up auto-save interval
                const autoSaveInterval = setInterval(() => {
                    if (!state.isSaved) {
                        localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(state.files));
                        localStorage.setItem(STORAGE_KEY_MAIN_FILE, state.mainFile);
                        localStorage.setItem(STORAGE_KEY_LANGUAGE, state.language);
                        state.isSaved = true;
                    }
                }, 3000);

                // Cleanup
                cleanup(() => {
                    editor.dispose();
                    editorInstance.value = null;
                    clearInterval(autoSaveInterval);
                });
            });
        }
    }, { strategy: 'document-ready' });

    // Handle language changes
    useVisibleTask$(({ track }) => {
        track(() => state.language);

        if (editorInstance.value) {
            // Only update language, not recreate the editor
            monaco.editor.setModelLanguage(editorInstance.value.getModel()!, state.language);
        }
    });


    return (
        <div
            className="flex h-screen flex-col bg-gray-900 text-white"
            onDragOver$={(e) => e.preventDefault()}
            onDrop$={(e) => {
                e.preventDefault();
                if (e.dataTransfer && e.dataTransfer.files.length > 0) {
                    handleFileImport(e.dataTransfer.files);
                }
            }}
        >
            <header class="flex items-center justify-between bg-gray-800 p-4">
                <h1 class="text-xl font-bold">Qwik Code Editor</h1>
                <div className="flex items-center gap-2">
                    <select
                        value={state.language}
                        onChange$={(e) =>
                            (state.language = (e.target as HTMLSelectElement).value)
                        }
                        class="rounded bg-gray-700 p-2 text-white"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="go">Go</option>
                    </select>
                    <button
                        onClick$={loadExampleFiles}
                        class="rounded bg-purple-600 px-4 py-2 hover:bg-purple-700"
                        title="Load example files with imports"
                    >
                        Load Examples
                    </button>
                    <button
                        onClick$={openFilePicker}
                        class="rounded bg-indigo-600 px-4 py-2 hover:bg-indigo-700"
                        title="Import files from computer"
                    >
                        Import Files
                    </button>


                    <button
                        onClick$={toggleServerSync}
                        class={`rounded px-4 py-2 ${state.serverSync ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}`}
                        title={
                            state.serverSync
                                ? "Server sync enabled"
                                : "Server sync disabled"
                        }
                    >
                        {state.serverSync ? "Sync: On" : "Sync: Off"}
                    </button>

                    {/* Session Modal */}
                    {showSessionModal.value && (
                        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                            <div className="w-96 rounded-lg bg-gray-800 p-6 shadow-lg">
                                <h3 class="mb-4 text-lg font-bold">Collaboration Session</h3>

                                <div className="mb-4">
                                    <div className="mb-3 flex gap-2">
                                        <button
                                            onClick$={() => (sessionMode.value = "create")}
                                            class={`flex-1 rounded py-2 ${sessionMode.value === "create" ? "bg-blue-600" : "bg-gray-600"}`}
                                        >
                                            Create Session
                                        </button>
                                        <button
                                            onClick$={() => (sessionMode.value = "join")}
                                            class={`flex-1 rounded py-2 ${sessionMode.value === "join" ? "bg-blue-600" : "bg-gray-600"}`}
                                        >
                                            Join Session
                                        </button>
                                    </div>

                                    {sessionMode.value === "create" ? (
                                        <div>
                                            <p class="mb-2">
                                                Create a new session to collaborate with others.
                                            </p>
                                            <input
                                                type="text"
                                                value={sessionId.value}
                                                onChange$={(e) =>
                                                    (sessionId.value = (
                                                        e.target as HTMLInputElement
                                                    ).value)
                                                }
                                                placeholder="Session ID (optional)"
                                                class="mb-2 w-full rounded bg-gray-700 p-2 text-white"
                                            />
                                            <p class="text-xs text-gray-400">
                                                Leave empty to generate a random ID
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p class="mb-2">Enter the session ID to join.</p>
                                            <input
                                                type="text"
                                                value={sessionId.value}
                                                onChange$={(e) =>
                                                    (sessionId.value = (
                                                        e.target as HTMLInputElement
                                                    ).value)
                                                }
                                                placeholder="Enter Session ID"
                                                class="w-full rounded bg-gray-700 p-2 text-white"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick$={() => (showSessionModal.value = false)}
                                        class="rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick$={
                                            sessionMode.value === "create"
                                                ? createSession
                                                : joinSession
                                        }
                                        class="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
                                    >
                                        {sessionMode.value === "create" ? "Create" : "Join"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick$={runCurrentCode}
                        disabled={state.isRunning}
                        class="rounded bg-green-600 px-4 py-2 hover:bg-green-700 disabled:opacity-50"
                    >
                        {state.isRunning ? "Running..." : "Run"}
                    </button>
                    {/* Add these buttons to the header next to the Run button */}
                    <button
                        onClick$={() => (showSessionModal.value = true)}
                        class="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
                        title={
                            isInSession.value
                                ? "Session active"
                                : "Create or join a session"
                        }
                    >
                        {isInSession.value
                            ? `Session: ${sessionId.value}`
                            : "Collaborate"}
                    </button>

                    {isInSession.value && (
                        <button
                            onClick$={toggleVoiceChat}
                            class={`px-4 py-2 rounded ${isVoiceChatActive.value ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                            title={isVoiceChatActive.value ? "Disable voice chat" : "Enable voice chat"}
                        >
                            {isVoiceChatActive.value ? "End call" : "Start call"}
                        </button>
                    )}
                    {isInSession.value && isVoiceChatActive.value && (
                        <div class="fixed bottom-4 right-4 w-80 z-50">
                            <VoiceChat autoStart={true} />
                        </div>
                    )}

                    <div className="ml-2 text-xs">
                        {state.isSaved ? (
                            <span class="text-green-400">Saved</span>
                        ) : (
                            <span class="text-yellow-400">Unsaved changes</span>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* File explorer */}
                <div className="flex w-64 flex-col bg-gray-800 p-4">
                    <div className="mb-2 flex items-center justify-between">
                        <h2 class="text-lg font-bold">Files</h2>
                        <div className="flex gap-1">
                            <button
                                onClick$={() =>
                                    (showMultiSelectMode.value = !showMultiSelectMode.value)
                                }
                                class={`rounded px-2 py-1 text-xs ${showMultiSelectMode.value ? "bg-blue-600" : "bg-gray-600"}`}
                                title="Toggle multi-select mode"
                            >
                                {showMultiSelectMode.value
                                    ? "Exit Multi-Select"
                                    : "Multi-Select"}
                            </button>
                            {showMultiSelectMode.value && selectedFiles.value.size > 0 && (
                                <button
                                    onClick$={initiateMultiFileMoveDialog}
                                    class="rounded bg-yellow-600 px-2 py-1 text-xs hover:bg-yellow-700"
                                    title="Move selected files"
                                >
                                    Move ({selectedFiles.value.size})
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        {/* File creation UI */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={fileName.value}
                                onChange$={(e) =>
                                    (fileName.value = (e.target as HTMLInputElement).value)
                                }
                                placeholder="filename.js"
                                class="flex-1 rounded bg-gray-700 p-2 text-white"
                            />
                            <button
                                onClick$={createNewFile}
                                class="rounded bg-blue-600 px-2 py-1 hover:bg-blue-700"
                                title="Create new file"
                            >
                                +
                            </button>
                        </div>

                        {/* Folder creation UI */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick$={() =>
                                    (showNewFolderInput.value = !showNewFolderInput.value)
                                }
                                class="rounded bg-teal-600 px-2 py-1 text-xs hover:bg-teal-700"
                                title="Create new folder"
                            >
                                New Folder
                            </button>
                        </div>

                        {showNewFolderInput.value && (
                            <div className="flex flex-col gap-2 rounded border border-gray-600 p-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newFolderName.value}
                                        onChange$={(e) =>
                                            (newFolderName.value = (
                                                e.target as HTMLInputElement
                                            ).value)
                                        }
                                        placeholder="folder name"
                                        class="flex-1 rounded bg-gray-700 p-2 text-white"
                                    />
                                    <button
                                        onClick$={createNewFolder}
                                        class="rounded bg-teal-600 px-2 py-1 hover:bg-teal-700"
                                        title="Create folder"
                                    >
                                        +
                                    </button>
                                </div>
                                {(showCreateFolder.value || folderPath.value) && (
                                    <input
                                        type="text"
                                        value={folderPath.value}
                                        onChange$={(e) =>
                                            (folderPath.value = (
                                                e.target as HTMLInputElement
                                            ).value)
                                        }
                                        placeholder="parent folder path"
                                        class="w-full rounded bg-gray-700 p-2 text-white"
                                    />
                                )}
                            </div>
                        )}

                        {showCreateFolder.value && (
                            <input
                                type="text"
                                value={folderPath.value}
                                onChange$={(e) =>
                                    (folderPath.value = (e.target as HTMLInputElement).value)
                                }
                                placeholder="folder/subfolder"
                                class="w-full rounded bg-gray-700 p-2 text-white"
                            />
                        )}
                    </div>

                    {/* Add hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange$={handleFileSelect}
                        multiple
                        class="hidden"
                    />

                    {/* Upload progress indicator */}
                    {isUploading.value && (
                        <div className="mb-2">
                            <div className="mb-1 text-sm">
                                Uploading files: {uploadProgress.value}%
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-gray-700">
                                <div
                                    className="h-2.5 rounded-full bg-blue-600"
                                    style={{width: `${uploadProgress.value}%`}}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Droppable area for root folder */}
                    <div
                        className={`mb-2 rounded border-2 border-dashed p-2 text-center ${dragOverFolder.value === "" ? "bg-opacity-30 border-blue-500 bg-blue-800" : "border-gray-600"}`}
                        onDragOver$={(e) => handleDragOver(e, "")}
                        onDrop$={(e) => handleDrop(e, "")}
                    >
                        Drop here to move to root folder
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <ul>
                            {fileTree.value.map((file) => (
                                <li
                                    key={file.path}
                                    class={`mb-1 flex cursor-pointer items-center justify-between rounded p-2 ${file.path === state.mainFile ? "bg-gray-700" : ""} ${file.isFolder ? "font-semibold text-blue-300" : ""} ${selectedFiles.value.has(file.path) ? "border border-blue-500" : ""} ${!file.isFolder && draggingFile.value === file.path ? "opacity-50" : ""} ${file.isFolder && dragOverFolder.value === file.path ? "bg-blue-800" : ""} ${dragOverFolder.value === "" && file.isFolder === false ? "bg-blue-800" : ""} hover:bg-gray-700`}
                                    style={{marginLeft: `${file.depth * 12}px`}}
                                    draggable={!file.isFolder}
                                    onDragStart$={(e) => handleDragStart(e, file.path)}
                                    onDragOver$={(e) =>
                                        file.isFolder ? handleDragOver(e, file.path) : undefined
                                    }
                                    onDragEnd$={handleDragEnd}
                                    onDrop$={(e) =>
                                        file.isFolder ? handleDrop(e, file.path) : undefined
                                    }
                                >
                    <span
                        class="flex flex-grow items-center"
                        onClick$={() =>
                            showMultiSelectMode.value
                                ? toggleFileSelection(file.path)
                                : selectFile(file.path)
                        }
                    >
                      {showMultiSelectMode.value && !file.isFolder && (
                          <input
                              type="checkbox"
                              checked={selectedFiles.value.has(file.path)}
                              onChange$={() => toggleFileSelection(file.path)}
                              class="mr-1"
                          />
                      )}
                        {file.isFolder ? "📁 " : "📄 "}
                        {file.name}
                    </span>
                                    <div className="flex">
                                        {!file.isFolder && !showMultiSelectMode.value && (
                                            <button
                                                onClick$={() => initiateFileMoveDialog(file.path)}
                                                class="px-1 text-yellow-400 hover:text-yellow-600"
                                                title="Move file"
                                            >
                                                📂
                                            </button>
                                        )}
                                        <button
                                            onClick$={() => deleteFile(file.path)}
                                            class="px-1 text-red-400 hover:text-red-600"
                                            title={
                                                file.isFolder
                                                    ? "Delete folder and contents"
                                                    : "Delete file"
                                            }
                                        >
                                            ×
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Editor */}
                <div className="flex flex-1 flex-col">
                    <div ref={editorContainerRef} className="flex-1"></div>

                    {/* Output */}
                    <div className="h-1/3 overflow-auto bg-black p-4">
                        <h2 class="mb-2 text-lg font-bold">Output</h2>
                        <pre class="font-mono whitespace-pre-wrap">{state.output}</pre>
                    </div>
                </div>
            </div>

            {/* Move File Dialog */}
            {showMoveFileDialog.value && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-96 rounded-lg bg-gray-800 p-6 shadow-lg">
                        <h3 class="mb-4 text-lg font-bold">
                            Move File{selectedFiles.value.size > 1 ? "s" : ""}
                        </h3>

                        {selectedFiles.value.size > 0 ? (
                            <div className="mb-4">
                                <p>
                                    Moving {selectedFiles.value.size} file
                                    {selectedFiles.value.size > 1 ? "s" : ""}:
                                </p>
                                <div className="mt-2 max-h-32 overflow-y-auto rounded bg-gray-700 p-2">
                                    {Array.from(selectedFiles.value).map((file) => (
                                        <div key={file} className="truncate font-mono text-sm">
                                            {file}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p class="mb-4">
                                Moving: <span class="font-mono">{fileToMove.value}</span>
                            </p>
                        )}

                        <div className="mb-4">
                            <label class="mb-2 block">Select destination folder:</label>
                            <select
                                value={targetFolder.value}
                                onChange$={(e) =>
                                    (targetFolder.value = (e.target as HTMLSelectElement).value)
                                }
                                class="w-full rounded bg-gray-700 p-2 text-white"
                            >
                                <option value="">Root (project root)</option>
                                {availableFolders.value
                                    .filter((folder) => folder !== "")
                                    .map((folder) => (
                                        <option key={folder} value={folder}>
                                            {folder}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick$={() => {
                                    showMoveFileDialog.value = false;
                                    fileToMove.value = "";
                                    targetFolder.value = "";
                                }}
                                class="rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick$={selectedFiles.value.size > 0 ? moveFiles : moveFile}
                                class="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
                            >
                                Move
                            </button>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
});

export const head: DocumentHead = {
    title: 'Qwik Code Editor',
    meta: [
        {
            name: 'description',
            content: 'Code editor built with Qwik and Monaco with file import support',
        },
    ],
};