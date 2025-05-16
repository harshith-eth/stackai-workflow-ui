"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Database, Filter, Image, Cpu, Variable, FunctionSquare as FunctionIcon, MessageSquare, ArrowUpDown, Workflow, FileJson, ChevronLeft, ChevronRight } from "lucide-react";
import { usePipelineStore } from "@/lib/pipeline/pipeline-store";
import { NodeData } from "@/lib/pipeline/node-types";

const toolbarItems: Record<string, { icon: any; items: NodeData[] }> = {
  general: {
    icon: Variable,
    items: [
      { type: "api", name: "API", icon: "ApiIcon", description: "Connect to external API endpoints" },
      { type: "database", name: "Database", icon: "Database", description: "Query and manipulate database data" },
      { type: "filter", name: "Filter", icon: "Filter", description: "Filter data based on conditions" },
      { type: "function", name: "Function", icon: "FunctionIcon", description: "Create custom function nodes" },
    ],
  },
  llms: {
    icon: Cpu,
    items: [
      { type: "llm", name: "LLM", icon: "Cpu", description: "Large Language Model processing" },
      { type: "prompt", name: "Prompt", icon: "MessageSquare", description: "Design and manage prompts" },
      { type: "completion", name: "Completion", icon: "FileText", description: "Generate text completions" },
    ],
  },
  knowledgeBase: {
    icon: Database,
    items: [
      { type: "vectorStore", name: "Vector Store", icon: "Database", description: "Manage vector embeddings" },
      { type: "documentLoader", name: "Document Loader", icon: "FileText", description: "Load and process documents" },
      { type: "retriever", name: "Retriever", icon: "Search", description: "Retrieve relevant information" },
    ],
  },
  integrations: {
    icon: Workflow,
    items: [
      { type: "webhook", name: "Webhook", icon: "Webhook", description: "Create and manage webhooks" },
      { type: "apiKey", name: "API Key", icon: "Key", description: "Manage API authentication" },
      { type: "oauth", name: "OAuth", icon: "Lock", description: "Configure OAuth connections" },
    ],
  },
  dataLoaders: {
    icon: FileJson,
    items: [
      { type: "csvLoader", name: "CSV Loader", icon: "FileText", description: "Load and parse CSV files" },
      { type: "jsonLoader", name: "JSON Loader", icon: "FileJson", description: "Load and parse JSON data" },
      { type: "sqlLoader", name: "SQL Loader", icon: "Database", description: "Execute SQL queries" },
    ],
  },
  multiModal: {
    icon: Image,
    items: [
      { type: "imageProcessing", name: "Image Processing", icon: "Image", description: "Process and analyze images" },
      { type: "audioProcessing", name: "Audio Processing", icon: "Music", description: "Process audio files" },
      { type: "videoProcessing", name: "Video Processing", icon: "Video", description: "Process video content" },
    ],
  },
  logic: {
    icon: ArrowUpDown,
    items: [
      { type: "condition", name: "Condition", icon: "GitBranch", description: "Create conditional branches" },
      { type: "loop", name: "Loop", icon: "Repeat", description: "Iterate over data sets" },
      { type: "switch", name: "Switch", icon: "ArrowUpDown", description: "Create multi-path branches" },
    ],
  },
  chat: {
    icon: MessageSquare,
    items: [
      { type: "chatMessage", name: "Chat Message", icon: "MessageSquare", description: "Create chat messages" },
      { type: "chatInput", name: "Chat Input", icon: "MessageCircle", description: "Handle user inputs" },
      { type: "chatOutput", name: "Chat Output", icon: "MessageCircleCheck", description: "Format and display responses" },
    ],
  },
};

const ToolbarItem = ({ item, onClick, isCollapsed }: { item: NodeData; onClick: (item: NodeData) => void; isCollapsed: boolean }) => {
  const getIcon = () => {
    switch (item.type) {
      case "api":
        return <Cpu className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "filter":
        return <Filter className="h-4 w-4" />;
      case "function":
        return <FunctionIcon className="h-4 w-4" />;
      case "llm":
        return <Cpu className="h-4 w-4" />;
      case "imageProcessing":
        return <Image className="h-4 w-4" />;
      default:
        return <Variable className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full text-left h-8",
        isCollapsed ? "px-3" : "px-3 py-2",
        "text-sm hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={() => onClick(item)}
      title={isCollapsed ? item.name : undefined}
    >
      <div className={cn("flex items-center gap-2", isCollapsed ? "justify-center w-full" : "justify-start w-full")}>
        {getIcon()}
        {!isCollapsed && <span>{item.name}</span>}
      </div>
    </Button>
  );
};

export function PipelineToolbar() {
  const { activeTab, addNodeToCanvas } = usePipelineStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  const filteredItems = React.useMemo(() => {
    if (!searchTerm) return toolbarItems[activeTab]?.items || [];
    
    return Object.values(toolbarItems)
      .flatMap(category => category.items)
      .filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [activeTab, searchTerm]);

  return (
    <div 
      className={cn(
        "border-r border-border flex-shrink-0 h-full bg-card/50 transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search components..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="px-2">
        <div className={cn(
          "space-y-1 overflow-y-auto pr-2",
          isCollapsed ? "h-[calc(100vh-4rem)]" : "h-[calc(100vh-12rem)]"
        )}>
          {filteredItems.map((item) => (
            <ToolbarItem 
              key={item.type} 
              item={item} 
              onClick={addNodeToCanvas} 
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-2 h-6 w-6 rounded-full border bg-background shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}