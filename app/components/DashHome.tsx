"use client";
import React, { useState, useRef, useEffect } from "react";
import DashHeader from "../components/DashboardHeader";
import { ArrowUp, Volume2, Clipboard, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DashHome = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [text] = useState("Welcome to Jamblify ai 🛩️");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stripMarkdown = (text: string) => {
    return text
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      .replace(/(```[\s\S]*?```|`.*?`)/g, "$2")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/[#>~*-]/g, "")
      .trim();
  };

  const speak = () => {
    const lastBotMessage = [...messages].reverse().find(m => m.role === "assistant");
    if (!lastBotMessage) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(stripMarkdown(lastBotMessage.text));
    utter.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    speechSynthesis.speak(utter);
  };

  const stopSpeak = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsTyping(value.trim() !== "");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
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

  const hasBotReply = messages.some(m => m.role === "assistant");

  return (
    <>
      <DashHeader />
    <div className="flex flex-col w-full h-screen overflow-x-hidden">      
      <div className="flex flex-col flex-1 p-4  overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">
          {!input && <h1 className="mt-10 text-center text-2xl p-10 md:p-0">{text}</h1>}
          {messages.map((msg, index) => (
  <div
    key={index}
    className={`p-2 sm:p-3 rounded-2xl shadow max-w-[75%] sm:max-w-[90%] whitespace-pre-wrap wrap-break-word ${
      msg.role === "user"
        ? "bg-blue-600 text-white self-end text-sm sm:text-base"
        : "bg-white text-black self-start text-sm sm:text-base"
    }`}
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
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
          {hasBotReply && !loading && (
            <div className="flex items-center gap-4 text-gray-700">
              <Volume2 className="cursor-pointer" onClick={() => (isSpeaking ? stopSpeak() : speak())} />
              {isCopied ? <Check className="text-green-500" /> : <Clipboard className="cursor-pointer" onClick={copyToClipboard} />}
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-4 ">
        <div className="max-w-2xl mx-auto flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 resize-none p-3 border rounded-xl text-[15px] md:text-xl outline-none max-h-60 overflow-y-auto transition-all duration-150"
            rows={1}
          />
          <button
            onClick={generateText}
            disabled={!isTyping || loading}
            className={`p-3 rounded-xl transition ${isTyping ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"}`}
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
      </>
  );
};

export default DashHome;