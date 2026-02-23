import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { experiences, education, skills } from '../data';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hi! I'm Andrew's AI assistant. I can answer questions about his experience, education, skills, and career. Feel free to ask anything!",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !hasApiKey) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(userInput);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 pt-24 pb-8">
      <div className="section-container max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[600px] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold">Ask About Andrew's Background</h2>
            <p className="text-blue-100 text-sm mt-1">
              Powered by AI - Ask questions about experience, skills, education, and more
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!hasApiKey && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ <strong>API Key Missing:</strong> Please add your Gemini API key to enable the chat. 
                  Create a <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code> file with:
                </p>
                <code className="bg-yellow-100 text-yellow-900 block p-2 rounded mt-2 text-xs">
                  VITE_GEMINI_API_KEY=your_api_key_here
                </code>
                <p className="text-yellow-800 text-xs mt-2">
                  Get your free API key at <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={hasApiKey ? "Ask me anything about Andrew..." : "API key required to chat"}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                disabled={isLoading || !hasApiKey}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !hasApiKey}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

async function getAIResponse(userMessage: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = generateSystemPrompt();
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

function generateSystemPrompt(): string {
  return `You are an AI assistant answering questions about Andrew Palmer's professional background.

CRITICAL RESPONSE RULES:
1. Answer ONLY what is asked - do not provide extra information
2. Keep responses SHORT and DIRECT - maximum 3-4 sentences per paragraph
3. Use ONLY these formats:
   - Simple sentences
   - Bullet points with dashes (-)
   - Line breaks between sections
4. NEVER use bold, asterisks, headers, or markdown
5. Always use 3rd person (Andrew, He, His)
6. If asked about unrelated topics, say: "I can only discuss Andrew's professional background"

ANDREW'S INFORMATION:

EXPERIENCE:
${experiences.map((exp) => `${exp.title} at ${exp.company} | ${exp.period} | ${exp.location}
${exp.description.map((desc) => `- ${desc}`).join('\n')}`).join('\n\n')}

EDUCATION:
${education.map((edu) => `${edu.degree} in ${edu.field} from ${edu.school} (${edu.graduationDate})`).join('\n')}

SKILLS:
${skills.map((cat) => `${cat.name}: ${cat.skills.join(', ')}`).join('\n')}`;
}
