"use client";
import React, { useState } from "react";
import { CircleArrowUp } from "lucide-react";

const DashHome = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowArrow(value.trim() !== "");
  };

  const generateText = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: input.trim() })
      });

      const data = await response.json();
      setOutput(response.ok ? data.output : data.error || "Error");
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      generateText();
    }
  };

  return (
    <section className="flex justify-center h-[70vh] items-center flex-col gap-5">
      <h1 className="text-2xl dark:text-white font-bold">Hello David</h1>

      <div>
        <p>{loading ? "Generating..." : output}</p>
      </div>

      <div className="flex p-4 shadow items-center gap-2">
        <input
          value={input}
          type="text"
          className="outline-none"
          placeholder="Ask me anything"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />

        {showArrow && (
          <button onClick={generateText} disabled={loading}>
            <CircleArrowUp />
          </button>
        )}
      </div>
    </section>
  );
};

export default DashHome;