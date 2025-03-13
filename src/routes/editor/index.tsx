import { 
    component$, 
    useSignal, 
    useStore,
    $ 
  } from '@builder.io/qwik';
  
  interface Commit {
    id: number;
    message: string;
    timestamp: string;
  }
  
  export default component$(() => {
    const code = useSignal(`# เริ่มเขียนโค้ดที่นี่
def hello_world():
    print("สวัสดีโลก!")`);
    
    const commitMessage = useSignal('');
    const commitHistory = useStore<Commit[]>([]);
    const terminalOutput = useStore<string[]>([
      '[SYSTEM] Starting Code Editor Terminal...',
      '[SYSTEM] Version 1.0.0',
      '[SYSTEM] Type "help" for available commands.'
    ]);
    const terminalInput = useSignal('');
    const isRepoInitialized = useSignal(false);
    const isCommitModalOpen = useSignal(false);
    const isGitInitModalOpen = useSignal(false);
  
    const handleTerminalInput$ = $((event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const input = terminalInput.value.trim();
        terminalOutput.push(`> ${input}`);
        
        switch(input.toLowerCase()) {
          case 'help':
            terminalOutput.push('Available commands:');
            terminalOutput.push('  - git init: Initialize a new git repository');
            terminalOutput.push('  - commit: Create a new commit');
            terminalOutput.push('  - push: Push changes to remote repository');
            terminalOutput.push('  - clear: Clear terminal screen');
            break;
          case 'clear':
            terminalOutput.splice(0, terminalOutput.length);
            break;
          default:
            terminalOutput.push('Command not recognized. Type "help" for available commands.');
        }
        
        terminalInput.value = '';
      }
    });
  
    const openGitInitModal$ = $(() => {
      if (!isRepoInitialized.value) {
        isGitInitModalOpen.value = true;
      }
    });
  
    const handleGitInit$ = $(() => {
      if (!isRepoInitialized.value) {
        terminalOutput.push('[INIT] กำลังเริ่มต้น Git Repository...');
        terminalOutput.push('[SUCCESS] Git Repository ถูกสร้างเรียบร้อย');
        isRepoInitialized.value = true;
        isGitInitModalOpen.value = false;
      }
    });
  
    const handleSaveCode$ = $(() => {
      const timestamp = new Date().toLocaleString();
      terminalOutput.push(`[SAVE] โค้ดถูกบันทึกเมื่อ ${timestamp}`);
    });
  
    const openCommitModal$ = $(() => {
      if (!isRepoInitialized.value) {
        terminalOutput.push('[ERROR] กรุณาทำ Git Init ก่อน');
        return;
      }
  
      isCommitModalOpen.value = true;
    });
  
    const handleInitCommit$ = $(() => {
      if (!commitMessage.value.trim()) {
        terminalOutput.push('[ERROR] กรุณาใส่ข้อความ Commit');
        return;
      }
  
      const newCommit: Commit = {
        id: commitHistory.length + 1,
        message: commitMessage.value,
        timestamp: new Date().toLocaleString()
      };
  
      commitHistory.push(newCommit);
      terminalOutput.push(`[COMMIT] ${commitMessage.value}`);
      commitMessage.value = '';
      isCommitModalOpen.value = false;
    });
  
    const handlePushCode$ = $(() => {
      if (!isRepoInitialized.value) {
        terminalOutput.push('[ERROR] กรุณาทำ Git Init ก่อน');
        return;
      }
  
      if (commitHistory.length === 0) {
        terminalOutput.push('[ERROR] ไม่มี Commit เพื่อ Push');
        return;
      }
  
      terminalOutput.push('[PUSH] กำลังส่งโค้ดไปยัง Remote Repository...');
      terminalOutput.push('[SUCCESS] Push สำเร็จ');
    });
  
    return (
      <>
        <div class="min-h-screen p-2 bg-gray-900 text-gray-100">
          <div class="container mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div class="p-4 flex justify-between items-center bg-gray-700 text-white">
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h1 class="text-xl font-bold">Code Editor</h1>
              </div>
              <div class="flex space-x-2">
                {/* Save Button */}
                <button 
                  onClick$={handleSaveCode$}
                  class="p-2 rounded flex items-center bg-green-700 hover:bg-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  บันทึก
                </button>
              </div>
            </div>
  
            {/* Main Content */}
            <div class="grid md:grid-cols-2 gap-4 p-4 bg-gray-900">
              {/* Code Editor */}
              <div class="rounded bg-gray-800">
                <textarea 
                  value={code.value}
                  onInput$={(e) => code.value = (e.target as HTMLTextAreaElement).value}
                  class="w-full h-96 p-4 font-mono text-sm focus:outline-none bg-gray-800 text-gray-100 border-gray-700"
                  placeholder="เขียนโค้ดที่นี่..."
                />
              </div>
  
              {/* Commit and Git Controls */}
              <div class="space-y-4">
                <div class="p-4 rounded bg-gray-800">
                  <div class="flex justify-end space-x-2">
                    <button 
                      onClick$={openGitInitModal$}
                      class={`p-2 rounded flex items-center ${
                        isRepoInitialized.value 
                          ? 'bg-green-700 text-white cursor-default' 
                          : 'bg-blue-700 hover:bg-blue-600 text-white'
                      }`}
                      disabled={isRepoInitialized.value}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      {isRepoInitialized.value ? 'Initialized' : 'Git Init'}
                    </button>
                    <button 
                      onClick$={openCommitModal$}
                      class={`p-2 rounded flex items-center ${
                        isRepoInitialized.value 
                          ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isRepoInitialized.value}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                      </svg>
                      Commit
                    </button>
                    <button 
                      onClick$={handlePushCode$}
                      class={`p-2 rounded flex items-center ${
                        isRepoInitialized.value 
                          ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isRepoInitialized.value}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Push
                    </button>
                  </div>
                </div>

                {/* Commit History */}
                <div class="p-4 rounded bg-gray-800">
                  <h2 class="text-lg font-semibold mb-2 text-gray-100">Commit History</h2>
                  {commitHistory.length === 0 ? (
                    <p class="text-gray-400">ยังไม่มี Commit</p>
                  ) : (
                    <ul class="space-y-2 max-h-64 overflow-y-auto">
                      {[...commitHistory].reverse().map((commit) => (
                        <li 
                          key={commit.id} 
                          class="p-2 rounded shadow-sm bg-gray-700 text-gray-100"
                        >
                          <div class="flex justify-between">
                            <div class="font-medium">{commit.message}</div>
                            <div class="text-sm text-gray-400">{commit.timestamp}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
  
            {/* Terminal Section */}
            <div class="bg-black text-green-300 font-mono p-4 h-64 overflow-y-auto">
              <div class="terminal-content">
                {terminalOutput.map((output, index) => (
                  <div key={index} class="whitespace-pre-wrap">
                    {output}
                  </div>
                ))}
                <div class="flex items-center">
                  <span class="mr-2">➜</span>
                  <input 
                    type="text"
                    value={terminalInput.value}
                    onInput$={(e) => terminalInput.value = (e.target as HTMLInputElement).value}
                    onKeyDown$={handleTerminalInput$}
                    class="bg-transparent border-none outline-none text-green-300 flex-grow"
                    placeholder="Enter command..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Git Init Confirmation Modal */}
        {isGitInitModalOpen.value && (
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-96">
              <h2 class="text-xl font-bold mb-4 text-gray-800">ยืนยันการเริ่มต้น Git Repository</h2>
              <p class="mb-4 text-gray-700">คุณแน่ใจหรือไม่ว่าต้องการเริ่มต้น Git Repository?</p>
              <div class="flex justify-end space-x-2">
                <button 
                  onClick$={() => isGitInitModalOpen.value = false}
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick$={handleGitInit$}
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Commit Modal */}
        {isCommitModalOpen.value && (
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-96">
              <h2 class="text-xl font-bold mb-4 text-gray-800">Commit</h2>
              <input 
                type="text"
                value={commitMessage.value}
                onInput$={(e) => commitMessage.value = (e.target as HTMLInputElement).value}
                placeholder="ข้อความ Commit"
                class="w-full p-2 rounded mb-4 bg-gray-100 text-gray-800 border border-gray-300"
              />
              <div class="flex justify-end space-x-2">
                <button 
                  onClick$={() => isCommitModalOpen.value = false}
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick$={handleInitCommit$}
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Commit
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  });