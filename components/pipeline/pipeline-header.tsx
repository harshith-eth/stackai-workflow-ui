"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Play, Save, Settings, ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePipelineStore } from "@/lib/pipeline/pipeline-store";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/ui/logo";

export function PipelineHeader() {
  const { toast } = useToast();
  const { pipelineName, setPipelineName } = usePipelineStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(pipelineName);

  const handleSavePipeline = () => {
    toast({
      title: "Pipeline saved",
      description: "Your pipeline has been saved successfully.",
    });
  };

  const handleRunPipeline = () => {
    toast({
      title: "Pipeline running",
      description: "Your pipeline is now running.",
    });
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setPipelineName(name);
    setIsEditing(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPipelineName(name);
      setIsEditing(false);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-3 h-12 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Logo className="h-6" />
        <div className="flex items-center gap-1.5">
          <Link href="/" className="text-primary font-medium hover:text-primary/90 transition-colors text-sm">
            Pipelines
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={handleNameKeyDown}
              className="bg-background/50 px-2 py-0.5 rounded border border-input focus:border-ring focus:outline-none text-sm"
              autoFocus
            />
          ) : (
            <button
              onClick={handleNameClick}
              className="font-medium hover:text-primary/90 transition-colors text-sm"
            >
              {pipelineName}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" onClick={handleSavePipeline} className="h-7 px-2.5 text-xs">
          <Save className="h-3.5 w-3.5 mr-1.5" />
          Save
        </Button>
        <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export
        </Button>
        <Button size="sm" onClick={handleRunPipeline} className="h-7 px-2.5 text-xs">
          <Play className="h-3.5 w-3.5 mr-1.5" />
          Run
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Settings className="h-3.5 w-3.5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Pipeline Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Pipeline Configuration
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </header>
  );
}