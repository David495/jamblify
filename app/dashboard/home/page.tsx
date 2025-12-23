"use client";
import React, { useState, useRef, useEffect } from "react";
import { CircleArrowUp, Volume2, Clipboard, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DashboardHeeader  from "../../components/DashboardHeader";

const DashHome = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [showArrow, setShowArrow] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
    const cleanText = stripMarkdown(lastBotMessage.text);

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.volume = 1;
    utter.rate = 1;
    setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utter);
  };

  const stopSpeak = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const copyToClipboard = () => {
    const lastBotMessage = [...messages].reverse().find(m => m.role === "assistant");
    if (!lastBotMessage) return;
    navigator.clipboard.writeText(lastBotMessage.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    setInput(el.value);
    setShowArrow(el.value.trim() !== "");
  };

  const generateText = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
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

      setMessages(prev => [...prev, { role: "assistant", text: botReply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      generateText();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateText();
    }
  };

  const hasBotReply = messages.some(m => m.role === "assistant");

  return (
      <>
      <DashboardHeeader/>
    <section className="flex justify-center items-center flex-col h-screen ">
      <div
        className="flex-1 justify-center items-center rounded-2xl bg-blue-800 overflow-y-auto px-4 md:px-20 space-y-4 w-[60%]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-fit max-w-[85%] md:max-w-[65%] p-4 rounded-2xl shadow-sm wrap-break-word
            ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="w-fit max-w-[60%] p-4 rounded-2xl shadow-sm mr-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white animate-pulse">
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />

        {hasBotReply && !loading && (
          <div className="text-white flex items-center gap-3">
            <Volume2
              className="cursor-pointer"
              onClick={() => (isSpeaking ? stopSpeak() : speak())}
            />
            {isCopied ? (
              <Check className="cursor-pointer text-green-400" />
            ) : (
              <Clipboard className="cursor-pointer" onClick={copyToClipboard} />
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 w-full bg-gray-50 dark:bg-gray-900 p-4 flex justify-center">
        <div
          className={`flex items-center border border-blue-200 px-4 py-3 rounded-2xl w-[500px] bg-white dark:bg-gray-800 gap-3
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <textarea
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={loading ? "Wait..." : "Ask me anything"}
            rows={1}
            disabled={loading}
            className="outline-none resize-none w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />

          {showArrow && !loading && (
            <button
              onClick={generateText}
              className="p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition"
            >
              <CircleArrowUp size={22} />
            </button>
          )}
        </div>
      </div>
    </section>
        </>
  );
};

export default DashHome;