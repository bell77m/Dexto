import { component$ } from "@builder.io/qwik";

export interface NumberedCircleProps {
  number: number;
  class?: string;
}

export const NumberedCircle = component$((props: NumberedCircleProps) => {
  return (
    <div
      class={`relative px-3.5 pt-3.5 pb-1.5 w-11 h-11 bg-red-600 rounded-full ${
        props.class || ""
      }`}
    >
      {props.number}
    </div>
  );
});
