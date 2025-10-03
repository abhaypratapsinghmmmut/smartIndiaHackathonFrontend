import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle , X} from "lucide-react";
import ReactMarkdown from "react-markdown";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
   const [messages, setMessages] = useState([
       {
         sender: "bot",
         text: "🙏 *Tashi Delek!* Welcome to the Sikkim Monasteries Heritage Portal. Ask me anything about the sacred monasteries of Sikkim.",
       },
     ]);
     const [input, setInput] = useState("");
     const [isTyping, setIsTyping] = useState(false);
     const chatEndRef = useRef(null);
   
     useEffect(() => {
       chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
     }, [messages]);
   
     const handleSend = async () => {
       if (!input.trim()) return;
   
       setMessages((prev) => [...prev, { sender: "user", text: input }]);
       setIsTyping(true);
   
       try {
   
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
    <>
      {open && (
        <div className="fixed bottom-4 
    w-[98%] sm:w-[400px] max-w-md
    h-[60vh] sm:h-[550px]
    flex flex-col rounded-xl overflow-hidden 
    shadow-2xl border border-amber-800/30 
    bg-slate-900/90 backdrop-blur-xl 
    z-50 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-2xl border-b border-gray-700">
            <h1 className="text-white font-bold">LamaBot AI</h1>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-900/90 to-gray-950">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-md prose prose-sm prose-invert ${
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
                <div className="bg-slate-700 px-3 py-2 rounded-2xl rounded-bl-none border border-amber-800/20 shadow-md">
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
          <div className="p-3 border-t border-amber-800/20 bg-slate-900/60 backdrop-blur-md">
            <div className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder="Ask about monasteries..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-slate-800/70 text-amber-100 placeholder-gray-300 px-3 py-2 rounded-xl outline-none text-sm font-light border border-amber-700/30 focus:border-amber-500 transition"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-700 text-white p-4 rounded-full shadow-xl transition z-50"
        >
          <MessageCircle size={20} className="text-white" />
        </button>
      )}
    </>
  );
};

export default FloatingChatbot;
