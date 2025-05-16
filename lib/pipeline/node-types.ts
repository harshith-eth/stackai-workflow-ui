import { ReactNode } from "react";
import { Node, Edge } from "reactflow";

export interface NodeData {
  type: string;
  name: string;
  icon?: string;
  description?: string;
  properties?: Record<string, any>;
}

export interface FlowNode extends Node<NodeData> {}

export interface FlowEdge extends Edge {}

export const initialNodes: FlowNode[] = [
  {
    id: "1",
    type: "api",
    position: { x: 250, y: 100 },
    data: { 
      type: "api", 
      name: "API", 
      description: "Connect to external API endpoints",
      properties: { url: "https://api.example.com" } 
    },
  },
  {
    id: "2",
    type: "database",
    position: { x: 500, y: 200 },
    data: { 
      type: "database", 
      name: "Database", 
      description: "Query and manipulate database data",
      properties: { query: "SELECT * FROM users" } 
    },
  },
];

export const initialEdges: FlowEdge[] = [
  { id: "e1-2", source: "1", target: "2" },
];