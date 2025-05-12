import {Client} from "@modelcontextprotocol/sdk/client/index";
import {StdioClientTransport} from "@modelcontextprotocol/sdk/client/stdio";
import OpenAI, {ChatCompletionTool} from "openai";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions/completions";

type McpServerConfig = {
    name: string;
    command: string;
    args: string[];
    env: Record<string, string>;
}

class MCPClient {
    private mcp: Client;
    private openai: OpenAI;

    private tools: ChatCompletionTool[] = [];

    constructor() {
        this.openai = new OpenAI(
            {
                // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
                apiKey: "sk-1644e3d37ff74f6c8073ee2593836a92",
                baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
                dangerouslyAllowBrowser: true
            }
        );

        this.mcp = new Client({name: "mcp-client-cli", version: "1.0.0"});
    }

    // methods will go here
    async connectToServer(mcpServerList: Array<McpServerConfig>) {
        try {
            for (let mcpServer of mcpServerList) {
                const transport = new StdioClientTransport({command: mcpServer.command, args: mcpServer.args, env: mcpServer.env})
                await this.mcp.connect(transport);
            }

            const toolsResult = await this.mcp.listTools();
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    type: "function",
                    function: {
                        name: tool.name,
                        description: tool.description,
                        parameters: tool.inputSchema,
                    },
                };
            });
            console.log("Connected to server with tools:", this.tools.map((t) => t.function.name));
        } catch (e) {
            console.log("Failed to connect to MCP server: ", e);
            throw e;
        }
    }


    async processQuery(query: string) {
        const messages: ChatCompletionMessageParam[] = [{role: "user", content: query,},];

        const response = await this.openai.chat.completions.create({
            model: 'qwen-turbo',
            max_completion_tokens: 10000,
            messages,
            // tools: this.tools,
        })

        const finalText = [];
        const toolResults = [];

        for (const content of response.choices) {
            finalText.push(content.message.content);
            if (content.finish_reason === "stop") {
                finalText.push(content.message.content);
            } else if (content.finish_reason === "tool_calls") {

                var toolCalls = content.message.tool_calls;
                if (!toolCalls || toolCalls.length === 0) {
                    throw new Error("No tool calls found");
                }

                const toolCall = toolCalls[0]
                const toolName = toolCall.function.name;
                const toolArgs = JSON.parse(toolCall.function.arguments);

                const result = await this.mcp.callTool({
                    name: toolName,
                    arguments: toolArgs,
                });
                toolResults.push(result);
                finalText.push(
                    `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`
                );

                messages.push({
                    role: "user",
                    content: result.content as string,
                });

                const response = await this.openai.chat.completions.create({
                    model: "qwen-turbo",
                    max_completion_tokens: 10000,
                    messages,
                });

                finalText.push(
                    response.choices[0].finish_reason === "stop" ? response.choices[0].message.content : ""
                );
            }
        }

        return finalText.join("\n");
    }

    async cleanup() {
        await this.mcp.close();
    }
}


export default MCPClient;