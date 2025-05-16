"use client";

import { create } from "zustand";
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  addEdge, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect, 
  ReactFlowInstance,
  XYPosition,
  applyNodeChanges, 
  applyEdgeChanges 
} from "reactflow";
import { nanoid } from "nanoid";
import { initialNodes, initialEdges, NodeData } from "@/lib/pipeline/node-types";

type ReactFlowStore = {
  nodes: Node[];
  edges: Edge[];
  reactFlowInstance: ReactFlowInstance | null;
  pipelineName: string;
  activeTab: string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;
  addNodeToCanvas: (node: NodeData) => void;
  createNode: (type: string, name: string, position: XYPosition) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  deleteNode: (id: string) => void;
  setPipelineName: (name: string) => void;
  setActiveTab: (tab: string) => void;
};

export const usePipelineStore = create<ReactFlowStore>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  reactFlowInstance: null,
  pipelineName: "Untitled Pipeline",
  activeTab: "general",

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        { 
          ...connection, 
          id: `e${connection.source}-${connection.target}`,
          animated: true,
          style: { stroke: 'hsl(var(--primary))' }
        }, 
        get().edges
      ),
    });
  },

  setReactFlowInstance: (instance: ReactFlowInstance) => {
    set({ reactFlowInstance: instance });
  },

  addNodeToCanvas: (nodeData: NodeData) => {
    const reactFlowBounds = get().reactFlowInstance?.screenToFlowPosition
      ? get().reactFlowInstance?.screenToFlowPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        })
      : { x: 100, y: 100 };

    const newNode = {
      id: nanoid(),
      type: nodeData.type,
      position: reactFlowBounds || { x: 100, y: 100 },
      data: nodeData,
    };

    set({ nodes: [...get().nodes, newNode] });
  },

  createNode: (type: string, name: string, position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type,
      position,
      data: { type, name, description: `New ${name} node` },
    };

    set({ nodes: [...get().nodes, newNode] });
  },

  updateNode: (id: string, data: Partial<NodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      }),
    });
  },

  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
    });
  },

  setPipelineName: (name: string) => {
    set({ pipelineName: name });
  },

  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },
}));