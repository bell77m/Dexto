import { component$ } from '@builder.io/qwik';
import { Sidebar } from '~/components/sidebar/Sidebar';
import { UserProfile } from '~/components/userProfile/UserProfile';


export default component$(() => {
  return (
    <div class="bg-gray-900">
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <UserProfile/>
    </div>
    </div>
  );
});
//test
// import { component$, useSignal, $ } from '@builder.io/qwik';
// import { Sidebar } from '~/components/sidebar/Sidebar';
// import { Link } from '@builder.io/qwik-city';

// export default component$(() => {
//   const displayName = useSignal("Guest");
//   const avatarUrl = useSignal<string>("/image/DeafaultPic.svg");
//   const showPopup = useSignal(false);

//   const selectAvatar = $((image: string) => {
//     avatarUrl.value = `/image/${image}`;
//     showPopup.value = false;
//   });

//   return (
//     <div class="flex w-full h-screen bg-gray-900">
//       {/* Sidebar ชิดซ้ายสุด */}
//       <div class="flex-shrink-0">
//         <Sidebar />
//       </div>

//       {/* ปุ่ม ESC บนขวา */}
//       <Link href="/home">
//         <button class="absolute top-5 right-5 z-50 flex flex-col items-center">
//           <div class="mb-1 text-base font-bold text-white rounded-full border-gray-800 border-solid border-[3px] h-[30px] w-[30px] flex items-center justify-center">x</div>
//           <div class="text-xs text-white">ESC</div>
//         </button>
//       </Link>

//       {/* Content */}
//       <div class="flex flex-grow px-10 py-5 text-white justify-between relative">
//         {/* ฟอร์มด้านซ้าย */}
//         <div class="flex flex-col w-2/3">
//           <Link href="/home" class="flex shrink-0 items-center cursor-pointer mt-6"> {/* เพิ่ม mt-6 เพื่อขยับโลโก้ลง */}
//             <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="167" height="32" />
//           </Link>

//           <div class="px-3 py-0 mt-5 max-sm:p-0">
//             <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
//             <input
//               type="text"
//               value={displayName.value}
//               onInput$={(event) => (displayName.value = (event.target as HTMLInputElement).value)}
//               class="p-3 mb-6 w-full text-base text-white bg-gray-800 rounded-lg border-none"
//             />
//             <div class="mx-0 my-6 h-px bg-stone-300"></div>
//             <div class="mb-2 text-base font-bold text-white">AVATAR</div>
//             <button
//               class="p-2.5 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none mt-4"
//               onClick$={() => (showPopup.value = true)}
//             >
//               Choose Avatar
//             </button>
//             {/* เพิ่ม margin top เพื่อขยับเส้นลง */}
//             <div class="mx-0 my-10 h-px bg-stone-300"></div>

//             {/* Login with GitHub */}
//             <a
//               href="https://github.com/login/oauth/authorize?client_id=yourClientID"
//               target="_blank"
//               class="mt-4 p-3 text-base text-white bg-gray-800 rounded-lg border-none w-full text-center hover:bg-gray-700"
//             >
//               Login with GitHub
//             </a>
//           </div>
//         </div>

//         {/* Avatar ด้านขวา */}
//         <div class="flex flex-col items-center ml-auto w-[400px]">
//           <img src={avatarUrl.value} alt="Avatar Preview" class="rounded-full h-[300px] w-[300px] border-2 border-emerald-300 mt-16" />

//           {/* ปุ่มอยู่ขวาล่าง */}
//           <div class="absolute bottom-5 right-5 flex gap-4">
//             <button class="px-4 py-2 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none">Save Change</button>
//             <button class="px-4 py-2 text-base text-white bg-transparent cursor-pointer border-none">Cancel</button>
//             <button class="px-4 py-2 text-base text-white bg-red-500 rounded-md cursor-pointer border-none">Logout</button>
//           </div>
//         </div>
//       </div>

//       {/* Popup เลือก Avatar */}
//       {showPopup.value && (
//         <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div class="bg-gray-800 p-8 rounded-lg w-[800px] text-center">
//             <div class="text-white text-lg font-bold mb-4">Choose an Avatar</div>
//             <div class="grid grid-cols-4 gap-6">
//               {[...Array(6)].map((_, i) => (
//                 <img
//                   key={i}
//                   src={`/image/Picture0${i + 1}.svg`}
//                   alt={`Avatar ${i + 1}`}
//                   class="cursor-pointer rounded-lg w-[150px] h-[150px] border-2 border-transparent hover:border-emerald-300"
//                   onClick$={() => selectAvatar(`Picture0${i + 1}.svg`)}
//                 />
//               ))}
//             </div>
//             <button class="mt-6 px-6 py-3 text-white bg-red-500 rounded-md" onClick$={() => (showPopup.value = false)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });
// import { component$, useSignal, $ } from '@builder.io/qwik';
// import { Sidebar } from '~/components/sidebar/Sidebar';
// import { Link } from '@builder.io/qwik-city';
// import { useUserStore } from '~/store/store';

// export default component$(() => {
//   const { displayName, profilePictureUrl, userId, updateStore } = useUserStore();
//   const showPopup = useSignal(false);
//   const newDisplayName = useSignal(displayName.value);
//   const selectedAvatar = useSignal(profilePictureUrl.value.trim());
//   const isSaving = useSignal(false);

//   const selectAvatar = $((image: string) => {
//     selectedAvatar.value = `/image/${image}`;
//     showPopup.value = false;
//   });

//   const saveProfile = $(async () => {
//     const cleanUrl = selectedAvatar.value.trim();
//     const cleanDisplayName = newDisplayName.value.trim();

//     if (!cleanUrl || !cleanDisplayName) {
//       console.error("❌ Invalid data");
//       return;
//     }

//     isSaving.value = true;
    
//     try {
//       const response = await fetch("http://dexto.com:3000/graphql", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: `
//             mutation UpdateUserProfile($id: Int!, $displayName: String!, $profilePictureUrl: String!) {
//               updateUser(id: $id, displayName: $displayName, profilePictureUrl: $profilePictureUrl) {
//                 id
//                 displayName
//                 profilePictureUrl
//               }
//             }
//           `,
//           variables: { id: userId.value, displayName: cleanDisplayName, profilePictureUrl: cleanUrl },
//         }),
//       });

//       const result = await response.json();
//       if (result.errors) {
//         console.error("❌ GraphQL Error:", result.errors);
//       } else if (result.data?.updateUser) {
//         console.log("✅ Profile updated successfully!");
//         updateStore(cleanDisplayName, userId.value, cleanUrl);
//       } else {
//         console.error("❌ Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("❌ Error updating profile:", error);
//     } finally {
//       isSaving.value = false;
//     }
//   });

//   return (
//     <div class="flex w-full h-screen bg-gray-900">
//       <div class="flex-shrink-0">
//         <Sidebar />
//       </div>
//       <Link href="/home">
//         <button class="absolute top-5 right-5 z-50 flex flex-col items-center">
//           <div class="mb-1 text-base font-bold text-white rounded-full border-gray-800 border-solid border-[3px] h-[30px] w-[30px] flex items-center justify-center">x</div>
//           <div class="text-xs text-white">ESC</div>
//         </button>
//       </Link>
//       <div class="flex flex-grow px-10 py-5 text-white justify-between relative">
//         <div class="flex flex-col w-2/3">
//           <div class="px-3 py-0 mt-5 max-sm:p-0">
//             <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
//             <input
//               type="text"
//               value={newDisplayName.value}
//               onInput$={(e) => (newDisplayName.value = (e.target as HTMLInputElement).value)}
//               class="p-3 mb-6 w-full text-base text-white bg-gray-800 rounded-lg border-none"
//             />
//             <button class="p-2.5 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none mt-4" onClick$={() => (showPopup.value = true)}>Choose Avatar</button>
//           </div>
//         </div>
//         <div class="flex flex-col items-center ml-auto w-[400px]">
//           <img src={selectedAvatar.value} alt="Avatar Preview" class="rounded-full h-[300px] w-[300px] border-2 border-emerald-300 mt-16" />
//           <div class="absolute bottom-5 right-5 flex gap-4">
//             <button class="px-4 py-2 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none" onClick$={saveProfile} disabled={isSaving.value}>{isSaving.value ? "Saving..." : "Save Change"}</button>
//             <button class="px-4 py-2 text-base text-white bg-transparent cursor-pointer border-none">Cancel</button>
//             <button class="px-4 py-2 text-base text-white bg-red-500 rounded-md cursor-pointer border-none">Logout</button>
//           </div>
//         </div>
//       </div>
//       {showPopup.value && (
//         <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div class="bg-gray-800 p-8 rounded-lg w-[800px] text-center">
//             <div class="text-white text-lg font-bold mb-4">Choose an Avatar</div>
//             <div class="grid grid-cols-4 gap-6">
//               {[...Array(6)].map((_, i) => (
//                 <img
//                   key={i}
//                   src={`/image/Picture0${i + 1}.svg`}
//                   alt={`Avatar ${i + 1}`}
//                   class="cursor-pointer rounded-lg w-[150px] h-[150px] border-2 border-transparent hover:border-emerald-300"
//                   onClick$={() => selectAvatar(`Picture0${i + 1}.svg`)}
//                 />
//               ))}
//             </div>
//             <button class="mt-6 px-6 py-3 text-white bg-red-500 rounded-md" onClick$={() => (showPopup.value = false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });
