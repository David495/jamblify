"use client"
import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../../components/SideBar";
import DashHeader from "../../../components/DashboardHeader";
import BackButton from "../../../components/BackButton";
import { ArrowUp, Clipboard, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const StoryPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("Welcome to the Story Page 📕");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsTyping(value.trim() !== "");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
    if (value.length > 0) setText("");
    if (value.length === 0) setText("Welcome to the Story Page 📕");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      generateStory();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateStory();
    }
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    }, 0);
  };

  const copyToClipboard = () => {
    const lastBotMessage = [...messages].reverse().find(m => m.role === "assistant");
    if (!lastBotMessage) return;
    navigator.clipboard.writeText(lastBotMessage.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateStory = async () => {
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
    <div className="flex flex-col w-full h-screen overflow-x-hidden p-4">
      <SideBar />

      <div className="flex flex-col flex-1 h-full">
        <DashHeader />
        <BackButton />

        {!input && <h1 className="mt-10 text-center text-2xl">{text}</h1>}

        <div className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 sm:p-3 rounded-2xl shadow max-w-[75%] sm:max-w-[90%] whitespace-pre-wrap break-words ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white self-end text-sm sm:text-base"
                    : "bg-white text-black self-start text-sm sm:text-base"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="p-3 rounded-2xl shadow bg-gray-200 text-black self-start max-w-[90%]">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>
        </div>

        <div className="w-full md:p-4">
          <div className="max-w-2xl mx-auto flex items-end gap-3">

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Describe the story you want..."
              className="flex-1 resize-none p-3 border rounded-xl text-[13px] md:text-xl outline-none max-h-60 overflow-y-auto transition-all duration-150"
              rows={1}
            />

            <button
              onClick={generateStory}
              disabled={!isTyping || loading}
              className={`p-3 rounded-xl transition ${
                isTyping ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            <button
              onClick={copyToClipboard}
              className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-black transition"
            >
              {isCopied ? <Check className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryPage;