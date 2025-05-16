"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Database } from "lucide-react";
import { NodeData } from "@/lib/pipeline/node-types";
import { NodeCard } from "@/components/pipeline/nodes/node-card";

function DatabaseNodeComponent({ data, isConnectable }: NodeProps<NodeData>) {
  return (
    <NodeCard title="Database" icon={<Database className="h-4 w-4" />}>
      <div className="px-3 py-2">
        <p className="text-xs text-muted-foreground">Query and manipulate database data</p>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-primary border-primary"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-primary border-primary"
      />
    </NodeCard>
  );
}

export const DatabaseNode = memo(DatabaseNodeComponent);