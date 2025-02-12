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
                  <img src="/image/CreateYourProject.png" width="453" height="265" />
                  <div class="ml-5 mt-6 self-start text-2xl leading-none tracking-tight">
                    How to create your Project
                  </div>
                </div>
              </div>
              <div class="px-6">
                <QuickstartGuide guides={props.quickstartGuides} />
              </div>
            </div>
          </div>
          <div class="ml-5 flex w-[68%] flex-col max-md:ml-0 max-md:w-full">
            <div class="mt-28 flex w-full flex-col items-start max-md:mt-10 max-md:max-w-full">
              <h1 class="text-5xl font-semibold leading-none tracking-tighter text-white max-md:text-4xl">
                Getting Started
              </h1>
              <div class="relative mt-10 w-[800px] h-[400px] max-w-full px-2 pb-44 pt-20 max-md:mt-10 max-md:pb-24 max-md:pr-5">
                <img src="/image/howToProject.png" width="800" height="250" />
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
              <div class="relative mt-20 w-[800px] h-[1000px] max-w-full px-2 pb-44 pt-20 max-md:mt-10 max-md:pb-24 max-md:pr-5">
                <img src="/image/HTCYP3.png" width="703" height="787" />
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
