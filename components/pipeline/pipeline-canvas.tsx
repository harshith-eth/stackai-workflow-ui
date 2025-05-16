"use client";

import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
  NodeTypes,
  useReactFlow,
} from "reactflow";
import { usePipelineStore } from "@/lib/pipeline/pipeline-store";
import { APINode } from "@/components/pipeline/nodes/api-node";
import { DatabaseNode } from "@/components/pipeline/nodes/database-node";
import { FilterNode } from "@/components/pipeline/nodes/filter-node";
import { FunctionNode } from "@/components/pipeline/nodes/function-node";
import "reactflow/dist/style.css";

const nodeTypes: NodeTypes = {
  api: APINode,
  database: DatabaseNode,
  filter: FilterNode,
  function: FunctionNode,
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setReactFlowInstance } = usePipelineStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow/type");
      const name = event.dataTransfer.getData("application/reactflow/name");

      if (!type || !reactFlowWrapper.current) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      usePipelineStore.getState().createNode(type, name, position);
    },
    [reactFlowInstance]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full bg-muted/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={["Backspace", "Delete"]}
        className="bg-muted/30"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1.5} 
          className="!text-border/60" 
        />
        <Controls className="!bg-background !border-border" />
        <MiniMap 
          className="!bg-background !border-border !border !rounded-md"
          nodeColor="var(--color-primary)"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}

export function PipelineCanvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}