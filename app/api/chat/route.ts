import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  // const headers = req.headers;
  // console.log("Test", headers.get("type"));

  const { stream, handlers } = LangChainStream({
    onCompletion: async (completion: string) => {
      console.log(completion);
    },
  });
  // handlers.handleLLMEnd = (_output: any, runId: string) => {
  //   console.log(_output.generations[0][0].text);
  //   return new Promise((resolve) => resolve(_output));
  // };
  // handlers.handleLLMStart = (_llm: any, _prompts: string[], runId: string) => {
  //   console.log(_prompts);
  //   return new Promise((resolve) => resolve());
  // };

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    maxTokens: 2000,
    streaming: true,
  });

  llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == "user"
          ? new HumanChatMessage(m.content)
          : new AIChatMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
