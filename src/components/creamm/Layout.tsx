import { component$ } from "@builder.io/qwik";
import { Sidebar } from "./Sidebar";
import { MessageSection } from "./MessageSection";

export const Layout = component$(() => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Asap:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Montserrat:wght@800&display=swap"
        rel="stylesheet"
      />
      <main class="overflow-hidden pr-20 min-h-screen bg-gray-900 max-md:pr-5">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col w-[23%] max-md:w-full">
            <Sidebar />
          </div>
          <div class="flex flex-col ml-5 w-[77%] max-md:w-full">
            <MessageSection />
          </div>
        </div>
      </main>
    </>
  );
});

export default Layout;
