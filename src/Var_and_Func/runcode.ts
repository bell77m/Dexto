import {server$} from "@builder.io/qwik-city";

export const runCode = server$(async (files: Record<string, string>, language: string, mainFile: string) => {
    try {
        const response = await fetch('http://192.168.118.6:12346/run', {
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