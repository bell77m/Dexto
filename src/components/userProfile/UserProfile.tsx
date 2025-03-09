import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";
import { avatarUrls } from "./avatarConfig";
export const UserProfile = component$(() => {
  const { displayName, profilePictureUrl, userId, updateStore } = useUserStore();
  const showPopup = useSignal(false);
  const selectedAvatar = useSignal(profilePictureUrl.value.trim());
  const newDisplayName = useSignal(displayName.value);
  const isSaving = useSignal(false);

  // ✅ เก็บค่าต้นฉบับไว้ใช้สำหรับปุ่ม Cancel
  const originalDisplayName = useSignal(displayName.value);
  const originalAvatar = useSignal(profilePictureUrl.value.trim());

  // ✅ โหลดข้อมูลล่าสุดเมื่อเปิดหน้า
  useVisibleTask$(() => {
    newDisplayName.value = displayName.value;
    selectedAvatar.value = profilePictureUrl.value.trim();
    originalDisplayName.value = displayName.value;
    originalAvatar.value = profilePictureUrl.value.trim();
  });

  // ✅ เมื่อกด `Cancel` → คืนค่ากลับไปที่ค่าก่อนหน้า
  const resetProfile = $(() => {
    newDisplayName.value = originalDisplayName.value;
    selectedAvatar.value = originalAvatar.value;
  });

  // ✅ ฟังก์ชันอัปเดตข้อมูลลง Database
  const saveProfile = $(async () => {
    const cleanUrl = selectedAvatar.value.trim();
    const cleanDisplayName = newDisplayName.value.trim();

    if (!cleanUrl || !cleanDisplayName) {
      console.error("❌ Invalid data");
      return;
    }

    isSaving.value = true; // ✅ เปลี่ยนปุ่มเป็น "Saving..."

    try {
      const response = await fetch("http://dexto.com:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation UpdateUserProfile($id: Int!, $displayName: String!, $profilePictureUrl: String!) {
              updateUser(id: $id, displayName: $displayName, profilePictureUrl: $profilePictureUrl) {
                id
                displayName
                profilePictureUrl
              }
            }
          `,
          variables: { id: userId.value, displayName: cleanDisplayName, profilePictureUrl: cleanUrl },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error("❌ GraphQL Error:", result.errors);
      } else if (result.data?.updateUser) {
        console.log("✅ Profile updated successfully!");
        updateStore(cleanDisplayName, userId.value, cleanUrl); // ✅ อัปเดต Store
        originalDisplayName.value = cleanDisplayName; // ✅ อัปเดตค่าใหม่
        originalAvatar.value = cleanUrl;
        // alert("Profile updated successfully!");
      } else {
        console.error("❌ Failed to update profile.");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    } finally {
      setTimeout(() => {
        isSaving.value = false; // ✅ หลังจาก 2 วินาที เปลี่ยนปุ่มกลับเป็น Save Change
      }, 2000);
    }
  });

  return (
    <div class="flex p-5 w-full h-screen bg-gray-900 max-md:flex-col max-sm:p-2.5">
      <div class="flex-1 px-10 py-5">
        <h1 class="text-xl font-bold text-white mb-4">Edit Profile</h1>
        <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
        <input
          type="text"
          value={newDisplayName.value}
          onInput$={(e) => (newDisplayName.value = (e.target as HTMLInputElement).value)}
          class="p-3 mb-6 w-full text-base text-white bg-gray-800 rounded-lg border-none"
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
          <button
            class={`px-4 py-2 text-base text-black rounded-md cursor-pointer border-none ${
              isSaving.value ? "bg-gray-500" : "bg-emerald-300"
            }`}
            onClick$={saveProfile}
            disabled={isSaving.value}
          >
            {isSaving.value ? "Saving..." : "Save Change"}
          </button>
          <button
            class="px-4 py-2 text-base text-white bg-gray-600 rounded-md cursor-pointer border-none"
            onClick$={resetProfile} // ✅ เมื่อกดปุ่มนี้ ข้อมูลจะกลับเป็นค่าก่อนหน้า
          >
            Cancel
          </button>
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
                  src={url}
                  alt={`Avatar ${i + 1}`}
                  class="cursor-pointer rounded-lg w-[80px] h-[80px] border-2 border-transparent hover:border-emerald-300"
                  onClick$={() => (selectedAvatar.value = url)}
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
