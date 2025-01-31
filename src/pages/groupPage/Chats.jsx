import React, { useState,na, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { MdVideoCall } from "react-icons/md";
import { FaCog, FaArrowLeft } from "react-icons/fa";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const socket = io("http://localhost:3000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [typing, setTyping] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const typingSoundRef = useRef(null);
  const { state } = useLocation();
  const { contextId,group_name } = state || {};
  const token = localStorage.getItem("token");

  useEffect(() => {
    socket.emit("joinRoom", contextId);

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      scrollToBottom(); // Scroll to the latest message
    });

    socket.on("userTyping", (userId) => {
      setTyping(true);
      typingSoundRef.current?.play();
      setTimeout(() => setTyping(false), 3000); // Hide typing indicator after 3 seconds
    });

    fetch(`http://localhost:3000/api/chats/${contextId}`, {
    method: "GET",
        headers: {
      Authorization: `Bearer ${token}`,
    },
  })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));

  return () => {
    socket.emit("leaveRoom", contextId);
    socket.off("newMessage");
    socket.off("userTyping");
  };
}, [contextId]);

useEffect(() => {
  scrollToBottom(); // Initial scroll to the latest message
}, [messages]);

const handleSendMessage = () => {
  if (message.trim()) {
    const newMessage = {
      context_type: "studygroups",
      context_id: contextId,
      message_content: message,
      sender_id: userId,
    };

    fetch("http://localhost:3000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newMessage),
    })
        .then((res) => res.json())
        .then((data) => {
          socket.emit("chatMessage", data);
          setMessage("");
        })
        .catch((err) => console.error("Error sending message:", err));
  }
};

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};
const toggleSettings = () => {
  setShowSettings((prev) => !prev);
};
const handleTyping = () => {
  if (message.trim()) {
    socket.emit("typing", contextId, userId);
  }
};

const getDateLabel = (date) => {
  const today = dayjs();
  const msgDate = dayjs(date);
  if (today.isSame(msgDate, "day")) return "Today";
  if (today.subtract(1, "day").isSame(msgDate, "day")) return "Yesterday";
  return msgDate.format("DD MMM YYYY");
};

const handleVideoCall = () => {
  navigate(`/call/${contextId}`,{ state: { contextId } });
};

const handlemembers = () => {
  navigate(`/members/${contextId}`,{ state: { contextId } });
};
const handlerequest = () => {
  navigate(`/joinRequest/${contextId}`,{ state: { contextId } });
};

return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
              className="text-white hover:text-gray-300"
              onClick={() => navigate(-1)}
              title="Back"
          >
            <FaArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Group Name - Centered */}
        <h1 className="text-lg font-semibold flex-1 text-center">
          {group_name}
        </h1>

        <div className="flex space-x-4">
          {/* Video Call Button */}
          <button
              className="text-white hover:text-gray-300"
              title="Start Video Call"
              onClick={handleVideoCall}
          >
            <MdVideoCall className="w-8 h-8" />
          </button>

          {/* Settings Button */}
          <button
              className="text-white hover:text-gray-300"
              title="Settings"
              onClick={toggleSettings}
          >
            <FaCog className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
          <div className="absolute top- right-0 w-72 bg-white shadow-lg rounded-lg p-6 z-20 border-2 border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Settings</h3>


            {/* Other Options */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Other Settings</h4>
              <ul className="space-y-3">
                <li>
                  <button
                      onClick={handlemembers}
                      className="w-full text-left bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
                  >
                    View Members
                  </button>
                </li>
                <li>
                  <button
                      onClick={handlerequest}
                      className="w-full text-left bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
                  >
                    View All Join Requests
                  </button>
                </li>

              </ul>
            </div>

            {/* Close Button */}
            <div className="mt-4">
              <button
                  className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition duration-200"
                  onClick={toggleSettings}
              >
                Close
              </button>
            </div>
          </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => {
          const isUserMessage = msg.sender_id._id === userId;
          const showDate =
              index === 0 ||
              getDateLabel(msg.createdAt) !== getDateLabel(messages[index - 1]?.createdAt);
          return (
              <React.Fragment key={index}>
                {showDate && (
                    <div className="text-center text-sm text-gray-500 my-4">
                      {getDateLabel(msg.createdAt)}
                    </div>
                )}
                <div
                    className={`flex mb-4 ${isUserMessage ? "justify-end" : "justify-start"}`}
                >
                  {/* Profile Picture */}
                  {!isUserMessage && (
                      <img
                          src={`http://localhost:3000/${msg.sender_id.profile_picture}`}
                            alt={`${msg.sender_id.name}'s avatar`}
                            className="w-10 h-10 rounded-full mr-2"
                            />
                            )}

                          {/* Message Bubble */}
                            <div
                            className={`p-3 rounded-lg max-w-md shadow-lg ${
                            isUserMessage
                            ? "bg-primary text-white"
                            : "bg-white text-black"
                          }`}
                          style={{
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                      >
                        <div className="flex items-center mb-1">
                    <span className={`font-semibold mr-2 ${isUserMessage ? "text-white" : "text-blue-700"}`}>
                      {msg.sender_id.name}
                    </span>
                          <span className={`text-xs ${isUserMessage ? "text-white" : "text-gray-500"}`}>
                      {dayjs(msg.createdAt).format("h:mm A")}
                    </span>
                        </div>
                        <p>{msg.message_content}</p>
                      </div>
                    </div>
                    </React.Fragment>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Typing Indicator */}
                {typing && (
                    <div className="flex justify-start p-2 mt-2 mx-2 bg-blue-100 rounded-lg shadow-lg w-auto max-w-xs">
                      <div className="flex items-center space-x-2 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-400"></div>
                        <span className="ml-2 text-gray-700 text-sm animate-fadeIn">Someone is typing...</span>
                      </div>
                    </div>
                )}



                {/* Message Input */}
                <div className="flex items-center p-4 border-t bg-white sticky bottom-0 shadow-lg">

                  <button className="text-gray-500 hover:text-blue-500 transition-all duration-200">
                    <FaPaperclip className="text-xl" />
                  </button>

                  {/* Input Field */}
                  <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 p-3 mx-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      onKeyUp={handleTyping}
                  />

                  {/* Smile Icon for Emojis */}
                  <button className="text-gray-500 hover:text-blue-500 transition-all duration-200">
                    <FaSmile className="text-xl" />
                  </button>

                  {/* Send Button */}
                  <button
                      onClick={handleSendMessage}
                      className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-full hover:bg-blue-600 transition-all duration-300"
                  >
                    <FaPaperPlane className="text-xl" />
                  </button>
                </div>
              </div>
          );
        }

          export default Chat;