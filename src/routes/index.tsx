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
} from "~/routes/constants";

// Server function to call the FastAPI backend
export const runCode = server$(async (files: Record<string, string>, language: string, mainFile: string) => {
    try {
        const response = await fetch('http://localhost:8080/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files,
                language,
                main_file: mainFile,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.output;
    } catch (error) {
        console.error('Error running code:', error);
        return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
});



export default component$(() => {
    // Use useStore for complex state to prevent unnecessary re-renders
    const state = useStore({
        files: DEFAULT_EXAMPLES.javascript,
        mainFile: 'index.js',
        language: 'javascript',
        isRunning: false,
        output: '',
        isSaved: true,
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

    // Load saved files from localStorage
    useVisibleTask$(({ track }) => {
        // Load files, main file, and language from localStorage
        const savedFiles = localStorage.getItem(STORAGE_KEY_FILES);
        const savedMainFile = localStorage.getItem(STORAGE_KEY_MAIN_FILE);
        const savedLanguage = localStorage.getItem(STORAGE_KEY_LANGUAGE);

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
    }, { strategy: 'document-ready' });

    // Save files to localStorage whenever they change
    useVisibleTask$(({ track }) => {
        track(() => state.files);
        track(() => state.mainFile);
        track(() => state.language);

        // Save current state to localStorage
        localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(state.files));
        localStorage.setItem(STORAGE_KEY_MAIN_FILE, state.mainFile);
        localStorage.setItem(STORAGE_KEY_LANGUAGE, state.language);

        state.isSaved = true;
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

    // Create a new file
    const createNewFile = $(() => {
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
        state.files = {
            ...state.files,
            [fullPath]: fileContent.value || ''
        };

        // Set current file
        state.mainFile = fullPath;

        // Determine language based on file extension
        const ext = fullPath.split('.').pop() || '';
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
            editorInstance.value.setValue(fileContent.value || '');
            monaco.editor.setModelLanguage(editorInstance.value.getModel(), state.language);
        }

        // Clear the inputs
        fileName.value = '';
        fileContent.value = '';
        folderPath.value = '';
        showCreateFolder.value = false;
    });

    // Create a new folder
    const createNewFolder = $(() => {
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

        // Clear the inputs
        newFolderName.value = '';
        folderPath.value = '';
        showNewFolderInput.value = false;
    });

    // Delete a file or folder
    const deleteFile = $((path: string) => {
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
                state.files = newFiles;

                // If we deleted the current file, select another one
                if (path === state.mainFile) {
                    // Find the first non-folder file
                    state.mainFile = Object.keys(newFiles).find(file => newFiles[file] !== FOLDER_MARKER) || Object.keys(newFiles)[0];

                    // Update editor if it exists
                    if (editorInstance.value) {
                        editorInstance.value.setValue(state.files[state.mainFile] || '');

                        // Update language based on new main file
                        const ext = state.mainFile.split('.').pop() || '';
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
        const ext = file.split('.').pop() || '';
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
    const moveFile = $(() => {
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
    const moveFiles = $(() => {
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
        <div class="flex flex-col h-screen bg-gray-900 text-white">
            <header class="bg-gray-800 p-4 flex items-center justify-between">
                <h1 class="text-xl font-bold">Qwik Code Editor</h1>
                <div class="flex items-center gap-2">
                    <select
                        value={state.language}
                        onChange$={(e) => state.language = (e.target as HTMLSelectElement).value}
                        class="bg-gray-700 text-white p-2 rounded"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="go">Go</option>
                    </select>
                    <button
                        onClick$={loadExampleFiles}
                        class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                        title="Load example files with imports"
                    >
                        Load Examples
                    </button>
                    <button
                        onClick$={runCurrentCode}
                        disabled={state.isRunning}
                        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
                    >
                        {state.isRunning ? 'Running...' : 'Run'}
                    </button>
                    <div class="text-xs ml-2">
                        {state.isSaved ?
                            <span class="text-green-400">Saved</span> :
                            <span class="text-yellow-400">Unsaved changes</span>
                        }
                    </div>
                </div>
            </header>

            <div class="flex flex-1 overflow-hidden">
                {/* File explorer */}
                <div class="w-64 bg-gray-800 p-4 flex flex-col">
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-lg font-bold">Files</h2>
                        <div class="flex gap-1">
                            <button
                                onClick$={() => showMultiSelectMode.value = !showMultiSelectMode.value}
                                class={`text-xs px-2 py-1 rounded ${showMultiSelectMode.value ? 'bg-blue-600' : 'bg-gray-600'}`}
                                title="Toggle multi-select mode"
                            >
                                {showMultiSelectMode.value ? "Exit Multi-Select" : "Multi-Select"}
                            </button>
                            {showMultiSelectMode.value && selectedFiles.value.size > 0 && (
                                <button
                                    onClick$={initiateMultiFileMoveDialog}
                                    class="text-xs bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                                    title="Move selected files"
                                >
                                    Move ({selectedFiles.value.size})
                                </button>
                            )}
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 mb-4">
                        {/* File creation UI */}
                        <div class="flex gap-2">
                            <input
                                type="text"
                                value={fileName.value}
                                onChange$={(e) => fileName.value = (e.target as HTMLInputElement).value}
                                placeholder="filename.js"
                                class="bg-gray-700 text-white p-2 rounded flex-1"
                            />
                            <button
                                onClick$={createNewFile}
                                class="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                                title="Create new file"
                            >
                                +
                            </button>
                        </div>

                        {/* Folder creation UI */}
                        <div class="flex justify-between items-center">
                            <button
                                onClick$={() => showNewFolderInput.value = !showNewFolderInput.value}
                                class="bg-teal-600 hover:bg-teal-700 px-2 py-1 rounded text-xs"
                                title="Create new folder"
                            >
                                New Folder
                            </button>
                        </div>

                        {showNewFolderInput.value && (
                            <div class="flex flex-col gap-2 border border-gray-600 p-2 rounded">
                                <div class="flex gap-2">
                                    <input
                                        type="text"
                                        value={newFolderName.value}
                                        onChange$={(e) => newFolderName.value = (e.target as HTMLInputElement).value}
                                        placeholder="folder name"
                                        class="bg-gray-700 text-white p-2 rounded flex-1"
                                    />
                                    <button
                                        onClick$={createNewFolder}
                                        class="bg-teal-600 hover:bg-teal-700 px-2 py-1 rounded"
                                        title="Create folder"
                                    >
                                        +
                                    </button>
                                </div>
                                {(showCreateFolder.value || folderPath.value) && (
                                    <input
                                        type="text"
                                        value={folderPath.value}
                                        onChange$={(e) => folderPath.value = (e.target as HTMLInputElement).value}
                                        placeholder="parent folder path"
                                        class="bg-gray-700 text-white p-2 rounded w-full"
                                    />
                                )}
                            </div>
                        )}

                        {showCreateFolder.value && (
                            <input
                                type="text"
                                value={folderPath.value}
                                onChange$={(e) => folderPath.value = (e.target as HTMLInputElement).value}
                                placeholder="folder/subfolder"
                                class="bg-gray-700 text-white p-2 rounded w-full"
                            />
                        )}
                    </div>
                    <div class="flex-1 overflow-y-auto">
                        <ul>
                            {fileTree.value.map((file) => (
                                <li
                                    key={file.path}
                                    class={`p-2 mb-1 cursor-pointer hover:bg-gray-700 rounded flex justify-between items-center
                                    ${file.path === state.mainFile ? 'bg-gray-700' : ''}
                                    ${file.isFolder ? 'text-blue-300 font-semibold' : ''}
                                    ${selectedFiles.value.has(file.path) ? 'border border-blue-500' : ''}`}
                                    style={{ marginLeft: `${file.depth * 12}px` }}
                                >
                                    <span
                                        class="flex-grow flex items-center"
                                        onClick$={() => showMultiSelectMode.value ? toggleFileSelection(file.path) : selectFile(file.path)}
                                    >
                                        {showMultiSelectMode.value && !file.isFolder && (
                                            <input
                                                type="checkbox"
                                                checked={selectedFiles.value.has(file.path)}
                                                onChange$={() => toggleFileSelection(file.path)}
                                                class="mr-1"
                                            />
                                        )}
                                        {file.isFolder ? '📁 ' : '📄 '}{file.name}
                                    </span>
                                    <div class="flex">
                                        {!file.isFolder && !showMultiSelectMode.value && (
                                            <button
                                                onClick$={() => initiateFileMoveDialog(file.path)}
                                                class="text-yellow-400 hover:text-yellow-600 px-1"
                                                title="Move file"
                                            >
                                                📂
                                            </button>
                                        )}
                                        <button
                                            onClick$={() => deleteFile(file.path)}
                                            class="text-red-400 hover:text-red-600 px-1"
                                            title={file.isFolder ? "Delete folder and contents" : "Delete file"}
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
                <div class="flex-1 flex flex-col">
                    <div ref={editorContainerRef} class="flex-1"></div>

                    {/* Output */}
                    <div class="h-1/3 bg-black overflow-auto p-4">
                        <h2 class="text-lg font-bold mb-2">Output</h2>
                        <pre class="font-mono whitespace-pre-wrap">{state.output}</pre>
                    </div>
                </div>
            </div>

            {/* Move File Dialog */}
            {showMoveFileDialog.value && (
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 class="text-lg font-bold mb-4">Move File{selectedFiles.value.size > 1 ? 's' : ''}</h3>

                        {selectedFiles.value.size > 0 ? (
                            <div class="mb-4">
                                <p>Moving {selectedFiles.value.size} file{selectedFiles.value.size > 1 ? 's' : ''}:</p>
                                <div class="max-h-32 overflow-y-auto mt-2 bg-gray-700 rounded p-2">
                                    {Array.from(selectedFiles.value).map(file => (
                                        <div key={file} class="text-sm font-mono truncate">{file}</div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p class="mb-4">Moving: <span class="font-mono">{fileToMove.value}</span></p>
                        )}

                        <div class="mb-4">
                            <label class="block mb-2">Select destination folder:</label>
                            <select
                                value={targetFolder.value}
                                onChange$={(e) => targetFolder.value = (e.target as HTMLSelectElement).value}
                                class="bg-gray-700 text-white p-2 rounded w-full"
                            >
                                <option value="">Root (project root)</option>
                                {availableFolders.value.filter(folder => folder !== '').map((folder) => (
                                    <option key={folder} value={folder}>
                                        {folder}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div class="flex justify-end gap-2">
                            <button
                                onClick$={() => {
                                    showMoveFileDialog.value = false;
                                    fileToMove.value = '';
                                    targetFolder.value = '';
                                }}
                                class="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick$={selectedFiles.value.size > 0 ? moveFiles : moveFile}
                                class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
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