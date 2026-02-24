import { useState, useRef, useEffect } from 'react';

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
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
    const [hasApiKey] = useState(true); // Always true since we use backend API
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
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-2xl z-40"
                aria-label="Open chat"
            >
                💬
            </button>

            {/* Chat Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
            )}

            {/* Chat Modal */}
            {isOpen && (
                <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-50">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold">Ask About Andrew</h2>
                            <p className="text-blue-100 text-xs">Powered by AI</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white hover:text-primary-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3">
                        {!hasApiKey && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3 break-words">
                                <p className="text-yellow-800 text-xs break-words">
                                    ⚠️ Ensure the backend API server is running: npm run api
                                </p>
                            </div>
                        )}
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    } min-w-0`}
                            >
                                <div
                                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm break-words ${message.sender === 'user'
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    <p className="break-words">{message.content}</p>
                                    <p
                                        className={`text-xs mt-1 flex-shrink-0 ${message.sender === 'user'
                                                ? 'text-blue-100'
                                                : 'text-gray-500'
                                            }`}
                                    >
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start min-w-0">
                                <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
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
                    <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={hasApiKey ? "Ask about Andrew..." : "API key required"}
                                className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                                disabled={isLoading || !hasApiKey}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || !hasApiKey}
                                className="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat API Error:', error);
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
6. If asked about unrelated topics, say: "I can only discuss Andrew's professional background"`;
}
