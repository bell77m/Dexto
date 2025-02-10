import { component$ } from "@builder.io/qwik";
import { QuickstartGuide } from "./QuickstartGuide";
import { StepInstruction } from "./StepInstruction";

interface HowToUseIDEProps {
  quickstartGuides: string[];
  stepInstructions: Array<{ step: number; content: string }>;
}

export const HowToUseIDE = component$<HowToUseIDEProps>(
  ({ quickstartGuides, stepInstructions }) => {
    return (
      <div class="overflow-hidden pr-10 pl-20 w-full bg-gray-900 pb-[565px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex flex-col w-[50%] max-md:w-full">
            <div class="flex flex-col max-md:mt-10">
              <div class="flex flex-col text-white max-md:mr-2.5">
                <div class="flex overflow-hidden flex-col px-2.5 pt-3 pb-5 max-w-full w-[500px] max-md:w-full">
                  <div class="overflow-hidden px-6 pt-4 pb-20 text-5xl tracking-tighter rounded-xl leading-[55px] max-md:px-5 max-md:pb-28 max-md:text-4xl max-md:leading-[51px]">
                    <img src="/image/howToIDE.png" class="h-auto w-full max-w-none object-contain" />
                  </div>
                  <div class="self-start mt-0 text-2xl text-center w-56 tracking-tight leading-none">
                    How to use IDE
                  </div>
                </div>
              </div>
              <div class="flex flex-col mt-12 ml-3.5 max-md:mt-10 max-md:ml-2.5">
                <div class="flex flex-col max-w-full w-[381px]">
                  <div class="self-start text-white pl-7 text-2xl">Quickstart guides</div>
                </div>
                <QuickstartGuide guides={quickstartGuides} />
              </div>
            </div>
          </div>
          <div class="absolute left-[540px] flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
            <div class="flex flex-col grow mt-28 text-2xl font-medium tracking-tight text-white leading-[50px] max-md:mt-10 max-md:max-w-full">
              <h1 class="pl-11 text-5xl font-semibold leading-none tracking-tighter text-white max-md:text-4xl">
                Getting Started
              </h1>
              <div class="flex shrink-0 mt-12 max-md:mt-10 max-md:max-w-full bg-black">
              <img src="/image/IDE2.png" class="h-auto w-auto" />
              </div>
              {stepInstructions.map((instruction, index) => (
                <StepInstruction
                  key={index}
                  step={instruction.step}
                  content={instruction.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
