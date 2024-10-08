"use client";
import { useState } from "react";

export default function ChatGroup() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("An error occurred while fetching the answer.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RAG Query System</h1>
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
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {answer && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
