import { $, component$, useStore } from "@builder.io/qwik";
import { Sidebarmini } from "~/components/sidebarmini/Sidebarmini";

export default component$(() => {
  // ใช้ useStore แทน useState เพื่อเก็บข้อมูล commit
  const state = useStore({
    commitHistory: [] as { message: string; time: string }[],
    message: ""
  });

  // ฟังก์ชันเพื่อเพิ่ม commit ลงในประวัติ
  const handleCommit = $(() => {
    if (state.message.trim() !== "") {
      const newCommit = {
        message: state.message,
        time: new Date().toLocaleString(), // ใช้เวลาปัจจุบัน
      };
      state.commitHistory.push(newCommit); // ใช้ push เพื่อเพิ่ม commit ใหม่
      state.message = ""; // ล้างข้อความหลังการ commit
    }
  });

  return (
    <div class="flex h-screen w-full bg-gray-900 p-4 text-white">
      {/* Sidebar mini (Fix Width) */}
      <div class="w-[80px] flex-shrink-0 border-r border-gray-700">
        <Sidebarmini />
      </div>

      {/* Commit Section */}
      <div class="w-[250px] flex-shrink-0 p-4 bg-gray-800 border-r border-gray-700 ml-4 h-screen flex flex-col">
        <h3 class="text-sm font-bold text-gray-400">Commit</h3>
        <input
          type="text"
          class="w-full p-2 mt-2 bg-gray-700 border border-gray-600 text-white"
          placeholder="Message (Ctrl+Enter to commit)"
          value={state.message}
          onInput$={(e) => state.message = (e.target as HTMLInputElement).value}
        />
        <button
          class="mt-2 w-full bg-blue-600 py-2 text-white font-bold rounded"
          onClick$={handleCommit}
        >
          Commit
        </button>

        <div class="mt-4 flex-1 overflow-y-auto">
          <h4 class="text-sm font-bold text-gray-400">Commit History</h4>
          <ul class="mt-2 text-sm text-gray-400 space-y-2">
            {state.commitHistory.map((commit, index) => (
              <li key={index} class="flex justify-between">
                <span>{commit.message}</span>
                <span class="text-xs text-gray-500">{commit.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div class="flex flex-1 flex-col p-4">
        <h2 class="mb-2 text-lg font-bold">Sidebar.tsx - loading (1 file)</h2>
        <div class="flex border border-gray-700">
          {/* Old Code */}
          <div class="w-1/2 border-r border-gray-700 p-4">
            <h3 class="text-sm font-bold text-gray-400">Before</h3>
            <pre class="mt-2 text-sm text-red-400">
              {`<div class="self-stretch my-auto w-[170px]">{displayName.value || "Guest"}</div>`}
            </pre>
          </div>

          {/* New Code */}
          <div class="w-1/2 p-4">
            <h3 class="text-sm font-bold text-gray-400">After</h3>
            <pre class="mt-2 text-sm text-green-400">
              {`<div class="self-stretch my-auto w-[170px]">{displayName.value || "Loading"}</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
});
