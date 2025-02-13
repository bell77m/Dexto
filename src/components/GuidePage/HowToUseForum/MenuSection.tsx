import { component$ } from "@builder.io/qwik";

interface MenuItem {
  text: string;
  isActive?: boolean;
}

const menuItems: MenuItem[] = [
  { text: "How to use IDE" },
  { text: "How to use chat" },
  { text: "How to add friend" },
  { text: "How to use forum", isActive: true },
  { text: "Notification" },
];

export const MenuSection = component$(() => {
  return (
    <div class="flex mt-12 flex-col max-w-full text-2xl tracking-tight leading-none text-center w-[381px]">
      <div class="flex flex-col justify-center px-3 py-11 rounded-2xl border-2 border-solid border-white border-opacity-30">
        <div class="flex flex-col min-h-[435px]">
          {menuItems.map((item, index) => (
            <div
              key={index}
              class={`px-10 py-3.5 mt-12 max-w-full w-[358px] max-md:px-5 max-md:mt-10 ${
                index === 0 ? "mt-0" : ""
              } ${
                item.isActive
                  ? "bg-white text-gray-900 rounded-xl"
                  : "text-white"
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
