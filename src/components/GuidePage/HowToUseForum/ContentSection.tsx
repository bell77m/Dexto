import { component$ } from "@builder.io/qwik";

interface ContentItem {
  type: "title" | "image" | "text";
  content: string;
}

const contentItems: ContentItem[] = [
  { type: "title", content: "Getting Started" },
  {
    type: "image",
    content:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e076ba4a118214dde5317e7aeb91a1e91f70461cc5b4ae661578977322f4db46?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd",
  },
  {
    type: "text",
    content: "Step 1: You will see post from other User in this area.",
  },
  { type: "text", content: "Step 2: You can add new post from this button." },
  {
    type: "image",
    content:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/094d2d6fc8a8a769cef3ef7841cb552c567d9cb23943713c8867ea3ef5267e57?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd",
  },
  {
    type: "text",
    content: "Step 3: This is pop-up when you want to create new post.",
  },
];

export const ContentSection = component$(() => {
  return (
    <div class="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
      <div class="flex flex-col grow items-start mt-24 text-2xl font-medium tracking-tight leading-none text-white max-md:mt-10 max-md:max-w-full">
        {contentItems.map((item, index) => {
          switch (item.type) {
            case "title":
              return (
                <div
                  key={index}
                  class="text-5xl font-semibold tracking-tighter leading-none max-md:text-4xl"
                >
                  {item.content}
                </div>
              );
            case "image":
              return (
                <img
                  key={index}
                  loading="lazy"
                  src={item.content}
                  alt=""
                  class="object-contain self-stretch mt-20 w-full aspect-[1.38] max-md:mt-10 max-md:max-w-full"
                />
              );
            case "text":
              return (
                <div key={index} class="mt-16 max-md:mt-10 max-md:max-w-full">
                  {item.content}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
});
