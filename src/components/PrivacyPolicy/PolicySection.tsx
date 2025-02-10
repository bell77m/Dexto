import { component$ } from "@builder.io/qwik";

export interface PolicySectionProps {
  title: string;
  items?: Array<{
    subtitle: string;
    list?: string[];
    content?: string;
  }>;
  content?: string;
  list?: string[];
}

export const PolicySection = component$((props: PolicySectionProps) => {
  return (
    <section class="mb-8">
      <h2 class="text-xl font-bold">{props.title}</h2>

      {props.items && (
        <div class="space-y-4 mt-2">
          {props.items.map((item, index) => (
            <div key={index}>
              <h3 class="font-semibold">{item.subtitle}</h3>
              {item.list && (
                <ul class="list-disc pl-6 space-y-2">
                  {item.list.map((listItem, listIndex) => (
                    <li key={listIndex}>{listItem}</li>
                  ))}
                </ul>
              )}
              {item.content && <p class="mt-2">{item.content}</p>}
            </div>
          ))}
        </div>
      )}

      {props.content && <p class="mt-2">{props.content}</p>}

      {props.list && (
        <ul class="list-disc pl-6 space-y-2">
          {props.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
});
