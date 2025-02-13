import { component$ } from "@builder.io/qwik";
import { NotificationHeader } from "./NotificationHeader";

export const NotificationPage = component$(() => {
  return (
    <div>
      <NotificationHeader title="Notification" />
    </div>
  );
});
