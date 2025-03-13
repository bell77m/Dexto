import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
 const navigate = useNavigate();

 return (
   <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500">
     <div class="text-center">
        <div class="flex justify-center py-5">
            <img alt="My DEXTO Icon" src="/image/DextoLogoDark.svg" width="167" height="32"/>
        </div>
       <h2 class="text-2xl mb-4">Service Unavailable</h2>
       <p class="text-gray-600 mb-6">
         ขณะนี้ระบบอยู่ระหว่างการปรับปรุง กรุณาลองใหม่ภายหลัง
       </p>
       <div class="flex justify-center gap-4">
         <button 
           onClick$={() => navigate(-1)}
           class="bg-orange-500 text-white px-4 py-2 rounded"
         >
           Refresh
         </button>
       </div>
     </div>
   </div>
 );
});