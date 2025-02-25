import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface UserProfileProps {
  initialDisplayName?: string;
}

export const UserProfile = component$((props: UserProfileProps) => {
  const displayName = useSignal(props.initialDisplayName ?? "Guest");
  const avatarUrl = useSignal<string | null>(null);

  const handleAvatarChange = $((event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) avatarUrl.value = URL.createObjectURL(file);
  });

  const removeAvatar = $(() => {
    avatarUrl.value = null;
  });

  return (
    <div class="flex p-5 w-full h-screen bg-gray-900 max-md:flex-col max-sm:p-2.5">
      <div class="flex-1 px-10 py-5">
        <Link href="/" class="flex shrink-0 items-center cursor-pointer">
          <img
            alt="My DEXTO Icon"
            src="/image/DextoLogo.svg"
            width="167"
            height="32"
          />
        </Link>
        <div class="px-3 py-0 mt-5 max-sm:p-0">
          <div class="mb-2 text-base font-bold text-white">DISPLAY NAME</div>
          <input
            type="text"
            value={displayName.value}
            onInput$={(event) =>
              (displayName.value = (event.target as HTMLInputElement).value)
            }
            class="p-3 mb-6 w-full text-base text-white bg-gray-800 rounded-lg border-none"
          />
          <div class="mx-0 my-6 h-px bg-stone-300"></div>
          <div class="mb-2 text-base font-bold text-white">AVATAR</div>
          <div class="flex gap-4 mt-4 max-sm:flex-col max-sm:gap-2">
            <label class="p-2.5 text-base text-black bg-emerald-300 rounded-lg cursor-pointer border-none">
              Change Avatar
              <input
                type="file"
                accept="image/*"
                class="hidden"
                onChange$={handleAvatarChange}
              />
            </label>

            <button
              class="p-2.5 text-base text-white bg-transparent cursor-pointer border-none"
              onClick$={removeAvatar}
            >
              Remove Avatar
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center p-5 w-[300px] max-md:w-full">
        <button
          class="flex flex-col items-center self-end mb-5"
          onClick$={() => console.log("ESC clicked")}
        >
          <div class="mb-1 text-base font-bold text-white rounded-full border-gray-800 border-solid border-[3px] h-[30px] w-[30px] flex items-center justify-center">
            x
          </div>
          <div class="text-xs text-white">ESC</div>
        </button>
        {avatarUrl.value ? (
          <img
            src={avatarUrl.value}
            alt="Avatar Preview"
            class="rounded-full h-[180px] w-[180px] border-2 border-emerald-300"
          />
        ) : (
          <div class="bg-gray-800 rounded-full h-[180px] w-[180px] border-2 border-stone-300"></div>
        )}
        <div class="flex gap-5 mt-auto max-sm:flex-col max-sm:gap-2">
          <button class="px-3.5 py-2.5 text-base text-black bg-emerald-300 rounded-lg cursor-pointer border-none">
            Save Change
          </button>
          <button class="p-2.5 text-base text-white bg-transparent cursor-pointer border-none">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});
