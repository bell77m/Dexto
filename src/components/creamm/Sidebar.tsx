import { component$ } from "@builder.io/qwik";
import { NavigationItem } from "./NavigationItem";
import { ThemeToggle } from "./ThemeToggle";

export const Sidebar = component$(() => {
  return (
    <aside class="flex flex-col mx-auto w-full font-medium bg-gray-900 border border-solid border-zinc-600">
      <header class="flex gap-6 justify-between items-center px-6 py-4 text-xl font-bold bg-gray-800 min-h-[72px] text-zinc-500 max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0510abcdc39434e57aaa04c65ac9590a8487a1aaefb8dde89a72f7a0f6081905?placeholderIfAbsent=true"
          alt="User avatar"
          class="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[42px]"
        />
        <h1 class="self-stretch my-auto w-[170px]">Mickie Mouse</h1>
      </header>

      <nav class="z-10 px-6 pt-6 w-full text-sm tracking-tight leading-none min-h-[314px] text-neutral-400 max-md:px-5">
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c667ba644b8bcbc797faf066c74a79637f3f73f30edd4a4cd94e785e2985d473?placeholderIfAbsent=true"
          label="Home"
        />
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0ff03a84d041545110a938ff1bdc38684642cf318e56f2cb38d9692f0ce9f1c6?placeholderIfAbsent=true"
          label="Project"
        />
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/3cd60c7724ad621dd3a1e21bd96d264389e02421fbd2efdada1ae8488f0f389a?placeholderIfAbsent=true"
          label="Chat"
          isActive={true}
        />
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f78c5bff69c771ccf3748030438a076c07c729a4d21731baef110416b200d3e8?placeholderIfAbsent=true"
          label="Forum"
        />
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/9528f7d8498655218aaa76dbd7efd424a889e07abbc2649622ca56363c41f5a0?placeholderIfAbsent=true"
          label="Git"
        />
      </nav>

      <section class="px-6 pt-6 pb-4 w-full text-sm tracking-tight leading-none whitespace-nowrap min-h-[147px] text-neutral-400 max-md:px-5">
        <h2 class="gap-2 px-3 w-full text-xs tracking-wide leading-tight uppercase">
          Settings
        </h2>
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/6ad5a228929148b6c6e7c1331fed7655c32f1acd9ecd976b83bd1819019d6f0c?placeholderIfAbsent=true"
          label="Notification"
        />
        <NavigationItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/a098a29cdbd95dc6c9e67533176a5ddbb5504324a47a3d26b4c05bcb437098e5?placeholderIfAbsent=true"
          label="Settings"
        />
      </section>

      <div class="self-center mt-44 ml-4 text-3xl font-extrabold tracking-widest leading-none text-center text-black max-md:mt-10">
        <span style="color: rgba(242,98,7,1);">DEX</span>
        <span style="color: rgba(255,255,255,1);">TO</span>
      </div>

      <footer class="px-6 pt-6 mt-56 w-full text-xs tracking-tight leading-none whitespace-nowrap bg-gray-800 min-h-[88px] max-md:px-5 max-md:mt-10">
        <ThemeToggle />
      </footer>
    </aside>
  );
});
