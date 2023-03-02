import React, { useEffect, useState } from "react";
import { Launcher } from "popup-chat-react";
import { getMessages } from "../../utils/API_CALLS";
import "./conversation.css";
import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_BASE_URL);

const Conversation = ({ userData, OpenChatBox, isOpen }) => {
  const [messageList, SetMessageList] = useState([]);

  const fetchMessages = async () => {
    const sender = sessionStorage.getItem("userid");
    const receiver = userData._id;
    const data = await getMessages({ sender, receiver });
    data.forEach((message) => {
      const author = message.sender === sender ? "me" : "them";
      const obj = {
        type: "text",
        author: author,
        data: { text: message.data },
      };
      SetMessageList((state) => [...state, obj]);
    });
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onMessageWasSent(message) {
    const data = message.data.text;
    const sender = sessionStorage.getItem("userid");
    const receiver = userData._id;
    socket.emit("message", { sender, receiver, data });
    SetMessageList((state) => [...state, message]);
  }

  socket.off("message").on("message", (msg) => {
    if (
      msg.receiver === sessionStorage.getItem("userid") &&
      msg.sender === userData._id
    ) {
      SetMessageList([
        ...messageList,
        {
          type: "text",
          author: "them",
          data: {
            text: msg.data,
          },
        },
      ]);
    }
  });

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: userData.name,
          imageUrl: userData.profilePic,
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messageList}
        onClick={OpenChatBox}
        isOpen={isOpen}
        placeholder="Enter Message"
        showEmoji={false}
      />
    </div>
  );
};

export default Conversation;
