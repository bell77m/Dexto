import { component$ } from "@builder.io/qwik";
import { AddFriendHeader } from "./AddFriendHeader";

export const AddFriendPage = component$(() => {
  return (
    <div>
      <AddFriendHeader title="How to add friend" />
    </div>
  );
});
