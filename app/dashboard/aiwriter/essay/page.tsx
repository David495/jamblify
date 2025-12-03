"use client"
import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../../components/SideBar";
import DashHeader from "../../../components/DashboardHeader";
import BackButton from "../../../components/BackButton";
import { ArrowUp, Clipboard, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Essay = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    setInput(el.value);
    setIsTyping(el.value.trim() !== "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      generateText();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateText();
    }
  };

  const copyToClipboard = () => {
    const lastBotMessage = [...messages].reverse().find(m => m.role === "assistant");
    if (!lastBotMessage) return;
    navigator.clipboard.writeText(lastBotMessage.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateText = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsTyping(false);
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: userMessage }),
      });

      const data = await response.json();
      const botReply = response.ok ? data.output : data.error || "Error";

      setMessages(prev => [...prev, { role: "assistant", text: botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong." }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 h-full">
        <DashHeader />
        <BackButton />

        <div className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">
            {messages.map((msg, index) => (
  <div
    key={index}
    className={`p-4 rounded-2xl shadow ${
      msg.role === "user"
        ? "bg-blue-600 text-white self-end"
        : "bg-white text-black self-start"
    } max-w-[90%] whitespace-pre-wrap`}
  >
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {msg.text}
      </ReactMarkdown>
    </div>
  </div>
))}

{loading && (
  <div className="p-4 rounded-2xl shadow bg-gray-200 text-black self-start max-w-[90%]">
    <div className="flex gap-1">
      <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
      <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
      <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
    </div>
  </div>
)}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        <div className="w-full border-t p-4 bg-white">
          <div className="max-w-2xl mx-auto flex items-end gap-3">
            <textarea
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Enter your essay topic"
              className="flex-1 resize-none p-3 border rounded-xl outline-none max-h-60 overflow-y-auto"
              rows={1}
            />

            <button
              onClick={generateText}
              disabled={!isTyping || loading}
              className={`p-3 rounded-xl transition ${
                isTyping ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              <ArrowUp />
            </button>

            <button
              onClick={copyToClipboard}
              className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-black transition"
            >
              {isCopied ? <Check /> : <Clipboard />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essay;