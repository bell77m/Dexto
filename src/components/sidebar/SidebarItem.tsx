// import { component$ } from "@builder.io/qwik";

// type SidebarItemProps = {
//   icon: string;
//   label: string;
// };

// export const SidebarItem = component$((props: SidebarItemProps) => {
//   return (
//     <div class="flex gap-3 items-center px-3 py-2.5 mt-2 max-w-full whitespace-nowrap bg-gray-900 rounded-lg w-[236px]">
//       <img
//         loading="lazy"
//         src={props.icon}
//         class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
//         alt=""
//       />
//       <div class="flex-1 shrink self-stretch my-auto basis-0">{props.label}</div>
//     </div>
//   );
// });
// import { component$ } from "@builder.io/qwik";

// type SidebarItemProps = {
//   icon: string;
//   label: string;
// };

// export const SidebarItem = component$((props: SidebarItemProps) => {
//   return (
//     <button class="flex gap-3 items-center px-3 py-2.5 mt-2 max-w-full whitespace-nowrap bg-gray-900 rounded-lg w-[236px] hover:bg-gray-800 transition text-left">
//       <img
//         loading="lazy"
//         src={props.icon}
//         class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
//         alt=""
//       />
//       <div class="flex-1 shrink self-stretch my-auto basis-0">{props.label}</div>
//     </button>
//   );
// });
import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

type SidebarItemProps = {
  icon: string;
  label: string;
  href?: string;
};

export const SidebarItem = component$((props: SidebarItemProps) => {
  const nav = useNavigate();

  return (
    <button
      class="flex gap-3 items-center px-3 py-2.5 mt-0 max-w-full whitespace-nowrap bg-gray-900 rounded-lg w-[236px] hover:bg-gray-800 transition text-left"
      onClick$={() => props.href && nav(props.href)}
    >
      <img
        loading="lazy"
        src={props.icon}
        class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        alt=""
      />
      <div class="flex-1 shrink self-stretch my-auto basis-0">{props.label}</div>
    </button>
  );
});