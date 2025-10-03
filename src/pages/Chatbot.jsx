import React, { useState, useRef, useEffect } from "react";
import { Send, Mountain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🙏 *Tashi Delek!* Welcome to the Sikkim Monasteries Heritage Portal. Ask me anything about the sacred monasteries of Sikkim.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setIsTyping(true);

    try {
      // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

      const res = await fetch(`http://localhost:3000/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }), // must match backend
      });

      const data = await res.json();

      const botReply =
        data.reply || "🙏 Sorry, I couldn't fetch an answer right now.";

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      console.error("Error:", err);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "🙏 Something went wrong connecting to the server. Please try again.",
          },
        ]);
        setIsTyping(false);
      }, 800);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-amber-800/30 bg-slate-900/80 backdrop-blur-xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white/90 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              LamaBot AI
            </h1>
            <div className="flex items-center justify-center mt-1 space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-200 text-xs font-light">Online</span>
            </div>
          </div>

          <Mountain className="w-7 h-7 text-white/90" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900/90 to-gray-950">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl shadow-md prose prose-sm prose-invert ${
                  msg.sender === "user"
                    ? "bg-amber-600 text-white rounded-br-none"
                    : "bg-slate-700 text-slate-100 rounded-bl-none border border-amber-800/20"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none border border-amber-800/20 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-amber-800/20 bg-slate-900/60 backdrop-blur-md">
          <div className="flex space-x-3 items-center">
            <input
              type="text"
              placeholder="Ask about monasteries, history, or Buddhist heritage..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-slate-800/70 text-amber-100 placeholder-gray-300 px-4 py-3 rounded-xl outline-none text-base font-light border border-amber-700/30 focus:border-amber-500 transition"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-gray-300 text-xs mt-3 font-light tracking-wide">
            Preserving the Sacred Heritage of Sikkim's Monasteries
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
