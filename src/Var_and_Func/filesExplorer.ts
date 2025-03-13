// Server function to list files from backend
import {server$} from "@builder.io/qwik-city";

export const listFilesFromServer = server$(async () => {
    try {
        const response = await fetch('http://192.168.118.6:12346/files');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.files;
    } catch (error) {
        console.error('Error listing files:', error);
        return [];
    }
});



// Server function to move files on backend
export const moveFileOnServer = server$(async (source: string, destination: string) => {
    try {
        const response = await fetch('http://192.168.118.6:12346/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source,
                destination,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error moving file:', error);
        throw error;
    }
});


// Server function to delete files from backend
export const deleteFileFromServer = server$(async (filePath: string) => {
    try {
        const response = await fetch(`http://192.168.118.6:12346/files/${filePath}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
});

// Server function to upload files to backend
export const uploadFilesToServer = server$(async (files: File[], folder?: string) => {
    try {
        const formData = new FormData();

        // Add each file to the form data
        files.forEach(file => {
            formData.append('files', file);
        });

        // Add folder if specified
        if (folder) {
            formData.append('folder', folder);
        }

        const response = await fetch('http://192.168.118.6:12346/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
});