import { component$ } from "@builder.io/qwik";

interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export const NavigationItem = component$<NavigationItemProps>(
  ({ icon, label, isActive = false }) => {
    return (
      <nav
        class={`flex gap-3 items-center px-3 py-2.5 max-w-full whitespace-nowrap ${
          isActive ? "bg-gray-800" : "bg-gray-900"
        } rounded-lg w-[236px]`}
      >
        <i class={`ti ti-${icon} text-lg text-white`}></i>
        <span class="flex-1 self-stretch my-auto text-white">{label}</span>
      </nav>
    );
  }
);
