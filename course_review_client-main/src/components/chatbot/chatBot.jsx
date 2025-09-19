// Chatbot component for handling user-bot conversation UI and logic
import { useState } from "react";
// Get API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

export default function Chatbot() {
  // State for chatbot open/close, messages, and input field
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Handles sending user input to the chatbot API and updating messages
  const handleSend = async () => {
    if (!input.trim()) return;
    // Add user message to chat
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    try {
      // Send user input to backend chatbot API
      const response = await fetch(`${API_URL}/api/chatbot/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      if (response.ok) {
        // Add bot reply to chat
        const data = await response.json();
        setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
      } else {
        throw new Error("Error in chatbot response");
      }
    } catch (error) {
      // Show error message in chat if API call fails
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Something went wrong. Please try again!" },
      ]);
    }
  };

  // Render chatbot UI (button, chat window, messages, input)
  return (
    <>
      {/* Chatbot floating window, only visible when isOpen is true */}
      <div
        className="fixed bottom-20 right-5 z-50"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="bg-white shadow-xl rounded-xl w-96 h-120 p-6 flex flex-col">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
            title="Close"
          >
            ✖
          </button>
          {/* Message list */}
          <div className="flex-grow overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded ${msg.type === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}
                style={{ color: "black" }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          {/* Input area */}
          <div className="mt-4 flex">
            <input
              className="flex-grow p-3 border rounded-l w-[40%]"
              style={{ color: "black" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-yellow-500 text-black px-6 py-3 rounded-r hover:bg-yellow-600"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {/* Button to open chatbot */}
      {!isOpen && (
        <button
          className="fixed bottom-20 right-5 z-50 bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600"
          onClick={() => setIsOpen(true)}
        >
          Chat with us
        </button>
      )}
    </>
  );
}
