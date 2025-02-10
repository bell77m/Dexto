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
    <>
      <span class="text-4xl">{props.title}</span>
      <br />
      {props.items && props.items.map((item, index) => (
        <div key={index}>
          <span class="font-bold">{item.subtitle}</span>
          {item.list && (
            <ul>
              {item.list.map((listItem, listIndex) => (
                <li key={listIndex}>
                  <span class="text-3xl">{listItem}</span>
                </li>
              ))}
            </ul>
          )}
          {item.content && <span class="text-3xl">{item.content}</span>}
          <br />
        </div>
      ))}
      {props.content && <span class="text-3xl">{props.content}</span>}
      {props.list && (
        <ul>
          {props.list.map((item, index) => (
            <li key={index}>
              <span class="text-3xl">{item}</span>
            </li>
          ))}
        </ul>
      )}
      <br />
    </>
  );
});