import { component$ } from "@builder.io/qwik";
import { QuickstartGuide } from "./QuickstartGuide";
import { StepIndicator } from "./StepIndicator";
import { ProjectCreationStep } from "./ProjectCreationStep";

export interface GettingStartedPageProps {
  quickstartGuides: string[];
}

export const GettingStartedPage = component$(
  (props: GettingStartedPageProps) => {
    return (
      <div class="w-full overflow-hidden bg-gray-900 pb-64 pl-20 pr-9 max-md:max-w-full max-md:px-5 max-md:pb-24">
        <div class="flex gap-5 max-md:flex-col">
          <div class="flex w-[32%] flex-col max-md:ml-0 max-md:w-full">
            <div class="flex flex-col text-white max-md:mt-10">
              <div class="flex flex-col max-md:mr-2.5">
                <div class="flex w-full flex-col overflow-hidden px-3.5 pb-5 pt-3">
                  <div class="w-[336px] overflow-hidden rounded-xl px-6 pb-16 pt-6 text-5xl leading-10 tracking-tighter max-md:px-5 max-md:text-4xl max-md:leading-9">
                    create
                    <br />
                    your Project
                  </div>
                  <div class="mt-6 self-start text-2xl leading-none tracking-tight">
                    How to create your Project
                  </div>
                </div>
              </div>
              <QuickstartGuide guides={props.quickstartGuides} />
            </div>
          </div>
          <div class="ml-5 flex w-[68%] flex-col max-md:ml-0 max-md:w-full">
            <div class="mt-28 flex w-full flex-col items-start max-md:mt-10 max-md:max-w-full">
              <h1 class="text-5xl font-semibold leading-none tracking-tighter text-white max-md:text-4xl">
                Getting Started
              </h1>
              <div class="relative mt-20 w-[800px] max-w-full px-2 pb-44 pt-20 max-md:mt-10 max-md:pb-24 max-md:pr-5">
                <img src="/image/howToProject.png" class="h-auto w-full" />
                <div class="absolute left-2 top-[152px] h-2 flex gap-5 rounded-lg p-2 shadow-lg max-md:flex-col">
                  <StepIndicator step={1} customClass="absolute w-[140px] h-6 flex gap-5 p-2 shadow-lg max-md:flex-col" />
                </div>
                <div class="absolute left-[248px] top-[146px] h-2 flex gap-5 rounded-lg p-2 shadow-lg max-md:flex-col">
                  <StepIndicator step={2} customClass="absolute w-[170px] pl-[180px] h-6 flex gap-5 p-2 shadow-lg max-md:flex-col" />
                </div>
              </div>
              <ProjectCreationStep
                stepNumber={1}
                instruction="Click on the Project bar."
              />
              <ProjectCreationStep
                stepNumber={2}
                instruction='Click on "Create your Project" to start creating your project or click on "Import your Project" to import your project.'
              />
              <div class="mt-16 flex w-[559px] max-w-full flex-wrap items-start max-md:mt-10">
                <div class="relative flex aspect-[0.584] flex-col self-stretch pb-32 pt-14 max-md:pb-24">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa1b6e5bec3e36412c2fef4ede5bc072ba2253573d889b0f7f88fc89d6f505f5?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
                    class="absolute inset-0 size-full object-cover"
                    alt=""
                  />
                  <div class="relative flex h-[51px] shrink-0 border-[3px] border-solid border-red-600"></div>
                  <div class="relative mt-14 flex h-[355px] shrink-0 border-[3px] border-solid border-red-600 max-md:mt-10"></div>
                </div>
                <div class="z-10 mt-20 flex flex-col max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b723e1db9da24b0992d6514ccdd62e24593e97e582dd34a2c4994d16be6a4b3d?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
                    class="aspect-[1.3] w-[152px] object-contain"
                    alt=""
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/41aafaf2156699f3a37946767a7908321b23d96a22a2f5f327bac27ca89b7f51?placeholderIfAbsent=true&apiKey=d4e73be049bd493481adccdb779ad4dd"
                    class="mt-5 aspect-[1.15] w-[152px] object-contain"
                    alt=""
                  />
                </div>
                <div class="mt-48 h-[34px] w-[34px] whitespace-nowrap rounded-full bg-red-600 px-2.5 text-xl font-semibold leading-none tracking-tight text-gray-900 max-md:mt-10">
                  3
                </div>
              </div>
              <ProjectCreationStep
                stepNumber={3}
                instruction="Name your project and select the programming language."
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
