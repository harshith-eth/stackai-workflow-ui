"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePipelineStore } from "@/lib/pipeline/pipeline-store";

interface TabItem {
  value: string;
  label: string;
}

const tabs: TabItem[] = [
  { value: "general", label: "General" },
  { value: "llms", label: "LLMs" },
  { value: "knowledgeBase", label: "Knowledge Base" },
  { value: "integrations", label: "Integrations" },
  { value: "dataLoaders", label: "Data Loaders" },
  { value: "multiModal", label: "Multi-Modal" },
  { value: "logic", label: "Logic" },
  { value: "chat", label: "Chat" },
];

export function PipelineTabs() {
  const { activeTab, setActiveTab } = usePipelineStore();

  return (
    <div className="border-b border-border bg-card/50">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full h-9" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}