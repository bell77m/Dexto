import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useUserStore } from "~/store/store";
import { avatarUrls } from "./avatarConfig";
import API_URL from "~/configURL/config";

export const UserProfile = component$(() => {
  const { displayName, profilePictureUrl, userId, updateStore } = useUserStore();
  const showPopup = useSignal(false);
  const selectedAvatar = useSignal(profilePictureUrl.value.trim());
  const newDisplayName = useSignal(displayName.value);
  const isSaving = useSignal(false);
  const avatarUrl = useSignal<string>("/image/DeafaultPic.svg");

  // Function to remove special characters from display name
  const sanitizeDisplayName = $((name: string) => {
    // Allow only letters and numbers
    return name.replace(/[^a-zA-Z0-9]/g, '');
  });

  const selectAvatar = $((image: string) => {
    avatarUrl.value = `/image/${image}`;
    showPopup.value = false;
  });

  const originalDisplayName = useSignal(displayName.value);
  const originalAvatar = useSignal(profilePictureUrl.value.trim());

  useVisibleTask$(() => {
    newDisplayName.value = displayName.value;
    selectedAvatar.value = profilePictureUrl.value.trim();
    originalDisplayName.value = displayName.value;
    originalAvatar.value = profilePictureUrl.value.trim();
  });

  const resetProfile = $(() => {
    newDisplayName.value = originalDisplayName.value;
    selectedAvatar.value = originalAvatar.value;
  });

  const saveProfile = $(async () => {
    const cleanUrl = selectedAvatar.value.trim();
    const cleanDisplayName = await sanitizeDisplayName(newDisplayName.value.trim());

    if (!cleanUrl || !cleanDisplayName) {
      console.error("❌ Invalid data");
      return;
    }

    // Ensure display name is not empty after sanitization
    if (cleanDisplayName.length === 0) {
      console.error("❌ Display name cannot be empty after removing special characters");
      return;
    }

    isSaving.value = true;

    try {
      const response = await fetch(API_URL, {
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
        updateStore(cleanDisplayName, userId.value, cleanUrl);
        window.location.reload();
        originalDisplayName.value = cleanDisplayName;
        originalAvatar.value = cleanUrl;
      } else {
        console.error("❌ Failed to update profile.");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    } finally {
      setTimeout(() => {
        isSaving.value = false;
      }, 2000);
    }
  });

  return (
    <div class="flex p-5 w-[1421px] h-screen bg-gray-900 max-md:flex-col max-sm:p-2.5">
      <div class="flex-1 px-10 py-5">
        <h1 class="text-xl font-semibold text-neutral-400 mb-4">Settings</h1>
        <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
        <input
          type="text"
          value={newDisplayName.value}
          onInput$={(e) => {
            // Remove special characters in real-time
            const sanitizedValue = (e.target as HTMLInputElement).value.replace(/[^a-zA-Z0-9]/g, '');
            (e.target as HTMLInputElement).value = sanitizedValue;
            newDisplayName.value = sanitizedValue;
          }}
          class="p-3 mb-6 w-full text-base text-white bg-gray-800 rounded-lg border-none"
        />
        <div class="mx-0 my-6 h-px bg-stone-300"></div>
        <div class="mb-2 text-base font-bold text-white">AVATAR</div>
        <div class="flex flex-col gap-4 mt-4 max-sm:flex-col max-sm:gap-2">
          <button
            class="p-2.5 text-base text-black bg-emerald-300 rounded-md w-40 cursor-pointer border-none"
            onClick$={() => (showPopup.value = true)}
          >
            Choose Avatar
          </button>
          <div class="mx-0 my-6 h-px bg-stone-300"></div>
          <a
            href="https://github.com/login/oauth/authorize?client_id=yourClientID"
            target="_blank"
            class="p-3 text-base text-white bg-gray-800 rounded-lg border-none w-40 text-center hover:bg-gray-700"
          >
            Login with GitHub
          </a>
        </div>
      </div>

      <div class="flex flex-col items-center p-5 w-[300px] max-md:w-full">
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
            onClick$={resetProfile}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Popup เลือก Avatar */}
      {showPopup.value && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-gray-800 p-6 rounded-lg w-[500px] text-center">
            <div class="text-white text-xl font-bold mb-6">Choose an Avatar</div>
            <div class="grid grid-cols-4 gap-4">
              {avatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Avatar ${i + 1}`}
                  class="cursor-pointer rounded-lg w-[100px] h-[100px] border-2 border-transparent hover:border-emerald-300"
                  onClick$={() => (selectedAvatar.value = url)}
                />
              ))}
            </div>
            <button class="mt-6 px-5 py-3 text-white bg-red-500 rounded-md text-lg" onClick$={() => (showPopup.value = false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
});