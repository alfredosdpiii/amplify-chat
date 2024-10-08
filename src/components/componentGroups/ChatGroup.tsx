"use client";
import { useState } from "react";

interface Message {
  type: "question" | "answer";
  content: string;
}

export default function ChatGroup() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { type: "question", content: question }]);

    try {
      const response = await fetch(
        "https://32fa-124-217-57-26.ngrok-free.app/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { type: "answer", content: data.answer },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "answer",
          content: "An error occurred while fetching the answer.",
        },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RAG Query System</h1>
      <div className="mb-4 h-96 overflow-auto border rounded p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.type === "question" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded text-black ${
                message.type === "question" ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
