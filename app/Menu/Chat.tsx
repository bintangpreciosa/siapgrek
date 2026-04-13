"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {

  // 🔥 Ambil insight langsung saat init
  const initialMessages = (() => {
    if (typeof window !== "undefined") {
      const insight = localStorage.getItem("chatInsight");

      if (insight) {
        localStorage.removeItem("chatInsight");
        return [
          {
            role: "assistant" as const,
            content: insight,
          },
        ];
      }
    }

    return [
      {
        role: "assistant" as const,
        content:
          "Halo, saya asisten SIAPGrek. Silakan tanya apa saja seputar sistem monitoring ini 😊",
      },
    ];
  })();

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data?.reply) {
        setMessages((prev) => [...prev, data.reply]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Maaf, terjadi kesalahan saat memproses pesan.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, server chat sedang bermasalah.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* TITLE */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">Chat AI</h1>
        <p className="text-sm text-gray-500">
          Chat berbasis AI untuk membantu penggunaan sistem SIAPGrek.
        </p>
      </div>

      {/* CHAT CONTAINER */}
      <div className="flex-1 bg-white rounded-2xl shadow-md flex flex-col min-h-0">
        
        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-xs text-gray-400">
              AI sedang mengetik...
            </p>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-100 p-3 flex gap-2 flex-shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan di sini..."
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-selected disabled:opacity-60 transition"
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>

        </form>

      </div>
    </div>
  );
}