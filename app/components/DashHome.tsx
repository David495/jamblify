"use client";
import React, { useState, useRef, useEffect } from "react";
import { CircleArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DashHome = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [showArrow, setShowArrow] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 80);
    return () => clearTimeout(timeout);
  }, [messages, loading]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowArrow(value.trim() !== "");
  };

  const generateText = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setShowArrow(false);
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: userMessage }),
      });

      const data = await response.json();
      const botReply = response.ok ? data.output : data.error || "Error";

      setMessages((prev) => [...prev, { role: "assistant", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) generateText();
  };

  return (
    <section className="flex flex-col h-dvh w-full bg-[#175680] dark:bg-gray-900 rounded-2xl">
      
      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 md:px-20 space-y-6 scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <h1 className="text-2xl text-white font-bold dark:text-white mb-6">
          Hello David 👋
        </h1>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-fit max-w-[85%] md:max-w-[65%] p-4 rounded-2xl shadow-sm 
            ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            }`}
          >
            <div className="prose dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="w-fit max-w-[60%] p-4 rounded-2xl shadow-sm mr-auto bg-blue dark:bg-gray-800 text-gray-900 dark:text-white">
            Thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-3 bg-gray-100 dark:bg-gray-900 flex justify-center border-t dark:border-gray-800">
        <div className="flex items-center gap-2 w-full max-w-3xl bg-white dark:bg-gray-800 border dark:border-gray-700 px-4 py-3 rounded-2xl shadow-md">
          <input
            value={input}
            type="text"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Message David AI..."
            className="flex-1 bg-transparent outline-none dark:text-white"
          />

          {showArrow && (
            <button
              onClick={generateText}
              disabled={loading}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              <CircleArrowUp size={22} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashHome;