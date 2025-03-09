import { component$, useSignal, $ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";
import { avatarUrls } from "./avatarConfig";

export const UserProfile = component$(() => {
  const { displayName, profilePictureUrl, userId, updateStore } = useUserStore();
  const showPopup = useSignal(false);
  const selectedAvatar = useSignal(profilePictureUrl.value.trim()); // ✅ ใช้ trim() ป้องกันปัญหา

  // ✅ เมื่อเลือกรูปใหม่ อัปเดตรูปในวงกลมทันที
  const selectAvatar = $((url: string) => {
    selectedAvatar.value = url;
    showPopup.value = false;
  });

  // ✅ อัปเดต Database เมื่อกด Save Change
  const saveProfile = $(async () => {
    const cleanUrl = selectedAvatar.value.trim(); // ✅ ป้องกัน Syntax Error

    if (!cleanUrl) {
      console.error("❌ Invalid Avatar URL");
      return;
    }

    console.log("🚀 Sending GraphQL Mutation:", JSON.stringify({
      query: `
        mutation UpdateUserProfile($id: Int!, $profilePictureUrl: String!) {
          updateUser(id: $id, profilePictureUrl: $profilePictureUrl) {
            id
            profilePictureUrl
          }
        }
      `,
      variables: { id: userId.value, profilePictureUrl: cleanUrl }
    }, null, 2));

    try {
      const response = await fetch("http://dexto.com:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation UpdateUserProfile($id: Int!, $profilePictureUrl: String!) {
              updateUser(id: $id, profilePictureUrl: $profilePictureUrl) {
                id
                profilePictureUrl
              }
            }
          `,
          variables: { id: userId.value, profilePictureUrl: cleanUrl },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error("❌ GraphQL Error:", result.errors);
      } else if (result.data?.updateUser) {
        console.log("✅ Profile picture updated!");
        updateStore(displayName.value, userId.value, cleanUrl); // ✅ อัปเดต Store
      } else {
        console.error("❌ Failed to update profile picture.");
      }
    } catch (error) {
      console.error("❌ Error updating profile picture:", error);
    }
  });

  return (
    <div class="flex p-5 w-full h-screen bg-gray-900 max-md:flex-col max-sm:p-2.5">
      <div class="flex-1 px-10 py-5">
        <h1 class="text-xl font-bold text-white mb-4">Edit Profile</h1>
        <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
        <input
          type="text"
          value={displayName.value}
          class="p-3 mb-6 w-full text-base text-white bg-gray-800 rounded-lg border-none"
          disabled
        />
        <div class="mx-0 my-6 h-px bg-stone-300"></div>
        <div class="mb-2 text-base font-bold text-white">AVATAR</div>
        <div class="flex gap-4 mt-4 max-sm:flex-col max-sm:gap-2">
          <button
            class="p-2.5 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none"
            onClick$={() => (showPopup.value = true)}
          >
            Choose Avatar
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center p-5 w-[300px] max-md:w-full">
        {/* ✅ รูปที่แสดงเป็นรูปที่เลือก */}
        <img src={selectedAvatar.value} alt="Avatar Preview" class="rounded-full h-[180px] w-[180px] border-2 border-emerald-300" />
        <div class="flex gap-6 mt-auto max-sm:flex-col max-sm:gap-2">
          <button class="px-4 py-2 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none" onClick$={saveProfile}>
            Save Change
          </button>
          <button class="px-4 py-2 text-base text-white bg-transparent cursor-pointer border-none">Cancel</button>
        </div>
      </div>

      {/* ✅ Popup เลือก Avatar */}
      {showPopup.value && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-gray-800 p-5 rounded-lg w-[300px] text-center">
            <div class="text-white text-lg font-bold mb-4">Choose an Avatar</div>
            <div class="grid grid-cols-3 gap-2">
              {avatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}  // ✅ ใช้ URL จากอาร์เรย์
                  alt={`Avatar ${i + 1}`}
                  class="cursor-pointer rounded-lg w-[80px] h-[80px] border-2 border-transparent hover:border-emerald-300"
                  onClick$={() => selectAvatar(url)}  // ✅ บันทึก URL ที่เลือก
                />
              ))}
            </div>
            <button class="mt-4 px-4 py-2 text-white bg-red-500 rounded-md" onClick$={() => (showPopup.value = false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
