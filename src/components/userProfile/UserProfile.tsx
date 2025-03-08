import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface UserProfileProps {
  initialDisplayName?: string;
}

export const UserProfile = component$((props: UserProfileProps) => {
  const displayName = useSignal(props.initialDisplayName ?? "Guest");
  const avatarUrl = useSignal<string>("/image/DeafaultPic.svg");
  const showPopup = useSignal(false);

  const selectAvatar = $((image: string) => {
    avatarUrl.value = `/image/${image}`;
    showPopup.value = false;
  });

  return (
    <div class="flex p-5 w-full h-screen bg-gray-900 max-md:flex-col max-sm:p-2.5">
      <div class="flex-1 px-10 py-5">
        <Link href="/home" class="flex shrink-0 items-center cursor-pointer">
          <img alt="My DEXTO Icon" src="/image/DextoLogo.svg" width="167" height="32" />
        </Link>
        <div class="px-3 py-0 mt-5 max-sm:p-0">
          <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
          <input
            type="text"
            value={displayName.value}
            onInput$={(event) => (displayName.value = (event.target as HTMLInputElement).value)}
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
      </div>
      <div class="flex flex-col items-center p-5 w-[300px] max-md:w-full">
        <Link href="/home">
          <button class="flex flex-col items-center self-end mb-5">
            <div class="mb-1 text-base font-bold text-white rounded-full border-gray-800 border-solid border-[3px] h-[30px] w-[30px] flex items-center justify-center">x</div>
            <div class="text-xs text-white">ESC</div>
          </button>
        </Link>
        <img src={avatarUrl.value} alt="Avatar Preview" class="rounded-full h-[180px] w-[180px] border-2 border-emerald-300" />
        <div class="flex gap-6 mt-auto max-sm:flex-col max-sm:gap-2">
          <button class="px-4 py-2 text-base text-black bg-emerald-300 rounded-md cursor-pointer border-none">Save Change</button>
          <button class="px-4 py-2 text-base text-white bg-transparent cursor-pointer border-none">Cancel</button>
          <button class="px-4 py-2 text-base text-white bg-red-500 rounded-md cursor-pointer border-none">Logout</button>
        </div>
      </div>
      {showPopup.value && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-gray-800 p-5 rounded-lg w-[300px] text-center">
            <div class="text-white text-lg font-bold mb-4">Choose an Avatar</div>
            <div class="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <img
                  key={i}
                  src={`/image/Picture0${i + 1}.svg`}
                  alt={`Avatar ${i + 1}`}
                  class="cursor-pointer rounded-lg w-[80px] h-[80px] border-2 border-transparent hover:border-emerald-300"
                  onClick$={() => selectAvatar(`Picture0${i + 1}.png`)}
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
