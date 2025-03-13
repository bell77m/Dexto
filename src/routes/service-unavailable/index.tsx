import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-red-600 mb-4">503</h1>
        <h2 class="text-2xl mb-4">Service Unavailable</h2>
        <p class="text-gray-600 mb-6">
          ขณะนี้ระบบอยู่ระหว่างการปรับปรุง กรุณาลองใหม่ภายหลัง
        </p>
        <button 
          onClick$={() => window.location.reload()}
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>
    </div>
  );
});