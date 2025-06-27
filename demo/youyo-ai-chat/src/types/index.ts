export interface NodeData {
  label?: string;
  [key: string]: any;
}

export interface UserMessageData {
  message: string;
  timestamp: Date;
}

export interface LLMMessageData {
  message: string;
  modelName: string;
  timestamp: Date;
} 