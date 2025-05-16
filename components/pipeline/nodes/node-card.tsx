"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface NodeCardProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  className?: string;
}

export function NodeCard({ children, title, icon, className }: NodeCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  // This would normally connect to the ReactFlow selection state
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div 
      className={cn(
        "group rounded-lg shadow-md bg-card border transition-all duration-150 select-none w-48",
        isSelected ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border hover:border-primary/50",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Node controls would go here */}
        </div>
      </div>
      {children}
    </div>
  );
}