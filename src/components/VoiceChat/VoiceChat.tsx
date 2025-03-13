import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { VCManager } from '~/imported_/vc';

export default component$<{ autoStart?: boolean }>((props) => {
    const vcManager = useSignal<VCManager | null>(null);
    const isCallActive = useSignal(false);
    const statusMessages = useSignal<string[]>([]);

    // Initialize VCManager when component mounts
    useVisibleTask$(({ track, cleanup }) => {
        track(() => props.autoStart);

        // Create a new VCManager instance
        const manager = new VCManager();
        vcManager.value = manager;

        // Create a custom element for status messages
        const statusDiv = document.createElement('div');
        statusDiv.id = 'statusDiv';
        statusDiv.style.display = 'none'; // Hide the original status div
        document.body.appendChild(statusDiv);

        // Create a MutationObserver to listen for status updates
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Extract the text content from added nodes and add to our status messages
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            statusMessages.value = [...statusMessages.value, node.textContent || ''];
                        }
                    });
                }
            });
        });

        // Start observing the status div
        observer.observe(statusDiv, { childList: true, subtree: true });

        // Auto-start call if prop is true
        if (props.autoStart && !isCallActive.value) {
            // Create required elements and start the call
            let startButton = document.getElementById('startButton');
            let endButton = document.getElementById('endButton');

            if (!startButton) {
                startButton = document.createElement('button');
                startButton.id = 'startButton';
                startButton.style.display = 'none';
                document.body.appendChild(startButton);
            }

            if (!endButton) {
                endButton = document.createElement('button');
                endButton.id = 'endButton';
                endButton.style.display = 'none';
                document.body.appendChild(endButton);
            }

            manager.initialize();
            manager.startCall();
            isCallActive.value = true;
        }

        // Clean up on component unmount
        cleanup(() => {
            // End any active call
            if (vcManager.value && isCallActive.value) {
                vcManager.value.endCall();
            }

            // Disconnect observer
            observer.disconnect();

            // Remove status div
            if (statusDiv.parentNode) {
                statusDiv.parentNode.removeChild(statusDiv);
            }
        });
    });

    // Start a call
    const startCallBtn = $(() => {
        if (!vcManager.value) return;

        // Create startButton and endButton elements if they don't exist
        let startButton = document.getElementById('startButton');
        let endButton = document.getElementById('endButton');

        if (!startButton) {
            startButton = document.createElement('button');
            startButton.id = 'startButton';
            startButton.style.display = 'none';
            document.body.appendChild(startButton);
        }

        if (!endButton) {
            endButton = document.createElement('button');
            endButton.id = 'endButton';
            endButton.style.display = 'none';
            document.body.appendChild(endButton);
        }

        // Initialize the VCManager with the UI elements
        vcManager.value.initialize();
        vcManager.value.startCall();
        isCallActive.value = true;
    });

    // End a call
    const endCallBtn = $(() => {
        if (!vcManager.value) return;

        vcManager.value.endCall();
        isCallActive.value = false;
    });

    return (
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-bold mb-4">Voice Chat</h3>

            <div class="flex gap-2 mb-4">
                <button
                    onClick$={startCallBtn}
                    class={`px-4 py-2 rounded ${isCallActive.value ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    disabled={isCallActive.value}
                >
                    Start Call
                </button>

                <button
                    onClick$={endCallBtn}
                    class={`px-4 py-2 rounded ${!isCallActive.value ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    disabled={!isCallActive.value}
                >
                    End Call
                </button>
            </div>

            {/* Status messages display */}
            <div class="bg-gray-900 p-3 rounded max-h-40 overflow-y-auto">
                <h4 class="text-sm font-semibold mb-2">Call Status</h4>
                {statusMessages.value.length === 0 ? (
                    <p class="text-gray-500 italic text-sm">No status messages yet</p>
                ) : (
                    <div class="text-xs space-y-1">
                        {statusMessages.value.map((message, index) => (
                            <div key={index} class="text-gray-300">{message}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});