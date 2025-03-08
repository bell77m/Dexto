import { useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

const STORAGE_KEY = 'userStore';

export const useUserStore = () => {
  const displayName = useSignal('');
  const userId = useSignal('');
  const profilePictureUrl = useSignal('');
  const isLoggedIn = useSignal(false);
  const navigate = useNavigate();

  useVisibleTask$(() => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (storedUser.displayName && storedUser.userId) {
      displayName.value = storedUser.displayName;
      userId.value = storedUser.userId;
      profilePictureUrl.value = storedUser.profilePictureUrl || '';
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
      console.warn("⚠️ User is not logged in. Redirecting to /login...");
      navigate("/login");
    }

    // ✅ ทำให้สามารถ Logout ผ่าน Console ได้
    (window as any).logoutUser = logoutUser;
    console.log("🔹 พิมพ์ `logoutUser()` ใน Console เพื่อออกจากระบบ");
  });

  const updateStore = $((newDisplayName: string, newUserId: string, newProfilePictureUrl: string) => {
    displayName.value = newDisplayName;
    userId.value = newUserId;
    profilePictureUrl.value = newProfilePictureUrl;
    isLoggedIn.value = true;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ displayName: newDisplayName, userId: newUserId, profilePictureUrl: newProfilePictureUrl })
    );
  });

  const logoutUser = $(async () => {
    if (!isLoggedIn.value) {
      console.warn("⚠️ User is already logged out.");
      return;
    }

    console.log(`🔴 Logging out: ${displayName.value} (ID: ${userId.value})`);

    try {
      const response = await fetch('http://dexto.com:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              logoutUser
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.data?.logoutUser) {
        console.log(`✅ User ${displayName.value} has logged out successfully.`);
        displayName.value = '';
        userId.value = '';
        profilePictureUrl.value = '';
        isLoggedIn.value = false;
        localStorage.removeItem(STORAGE_KEY);
        navigate("/login");
      } else {
        console.error("❌ Logout failed:", result.errors || "Unknown error");
      }
    } catch (error) {
      console.error("❌ Failed to logout due to network error:", error);
    }
  });

  return { displayName, userId, profilePictureUrl, isLoggedIn, updateStore, logoutUser };
};
