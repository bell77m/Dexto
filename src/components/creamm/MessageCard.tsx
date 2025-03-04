import { component$ } from "@builder.io/qwik";
import type { MessageCardProps } from "./types";

export const MessageCard = component$<MessageCardProps>(
  ({ avatar, username, time, message, labels = [] }) => {
    return (
      <article class="flex overflow-hidden flex-wrap gap-4 items-start p-3 mt-6 rounded-xl bg-indigo-500 bg-opacity-10 min-h-[93px]">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          class="object-contain shrink-0 rounded-full aspect-square w-[50px]"
        />
        <div class="flex flex-col flex-1 shrink basis-0 min-w-60">
          <div class="w-full whitespace-nowrap">
            <div class="flex gap-3 items-start w-full text-sm text-neutral-200">
              <span class="flex-1 shrink basis-0">{username}</span>
              <time class="opacity-30">{time}</time>
            </div>
            <p class="text-xs text-neutral-400">{message}</p>
          </div>
          {labels.length > 0 && (
            <div class="flex gap-2 items-start self-start mt-2 text-xs text-slate-500">
              {labels.map((label) => (
                <span
                  key={label}
                  class="gap-2.5 px-2 py-0.5 rounded-xl border border-solid border-[color:var(--gray-gray-400,#CBD5E0)]"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }
);
