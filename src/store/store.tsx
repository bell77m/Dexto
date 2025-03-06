import { useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

const STORAGE_KEY = 'userStore';

export const useUserStore = () => {
  const displayName = useSignal('');
  const userId = useSignal('');
  const profilePictureUrl = useSignal(''); // เพิ่มการจัดเก็บรูปโปรไฟล์

  useVisibleTask$(() => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (storedUser.displayName && storedUser.userId) {
      displayName.value = storedUser.displayName;
      userId.value = storedUser.userId;
      profilePictureUrl.value = storedUser.profilePictureUrl || ''; // โหลด URL ของรูป
    }
  });

  const updateStore = $((newDisplayName: string, newUserId: string, newProfilePictureUrl: string) => {
    displayName.value = newDisplayName;
    userId.value = newUserId;
    profilePictureUrl.value = newProfilePictureUrl;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ displayName: newDisplayName, userId: newUserId, profilePictureUrl: newProfilePictureUrl })
    );
  });

  const logout = $(() => {
    displayName.value = '';
    userId.value = '';
    profilePictureUrl.value = '';
    localStorage.removeItem(STORAGE_KEY);
  });

  return { displayName, userId, profilePictureUrl, updateStore, logout };
};
