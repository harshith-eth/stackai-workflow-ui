"use client";

import { PipelineHeader } from "@/components/pipeline/pipeline-header";
import { PipelineTabs } from "@/components/pipeline/pipeline-tabs";
import { PipelineToolbar } from "@/components/pipeline/pipeline-toolbar";
import { PipelineCanvas } from "@/components/pipeline/pipeline-canvas";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen h-screen overflow-hidden">
      <PipelineHeader />
      <PipelineTabs />
      <div className="flex flex-1 overflow-hidden">
        <PipelineToolbar />
        <PipelineCanvas />
      </div>
    </main>
  );
}