import React, { useEffect, useState } from "react";
import { Launcher } from "popup-chat-react";
import { getMessages } from "../../utils/API_CALLS";

import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_BASE_URL);

const Conversation = ({ userData, OpenChatBox, isOpen }) => {
  const [state, setState] = useState({
    messageList: [],
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: true,
  });

  const fetchMessages = async () => {
    const sender = sessionStorage.getItem("userid");
    const receiver = userData._id;
    const data = await getMessages({ sender, receiver });
    data.map((message) => {
      // console.log(message);
      const author = message.sender === sender ? "me" : "them";
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList,
          { type: "text", author: author, data: { text: message.data } },
        ],
      }));
    });
    // console.log(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  function onMessageWasSent(message) {
    const data = message.data.text;
    const sender = sessionStorage.getItem("userid");
    const receiver = userData._id;
    socket.emit("message", { sender, receiver, data });
    // helper({ data, receiver, sender });
    setState((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    }));
  }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState((state) => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          },
        },
      ],
    }));
  }

  socket.off("message").on("message", (msg) => {
    if (
      msg.receiver === sessionStorage.getItem("userid") &&
      msg.sender === userData._id
    ) {
      setState((state) => ({
        ...state,
        messageList: [
          ...state.messageList,
          {
            type: "text",
            author: "them",
            data: {
              text: msg.data,
            },
          },
        ],
      }));
    }
  });

  return (
    <div>
      {/* <Header />

      <TestArea
        onMessage={sendMessage}
      /> */}
      <Launcher
        agentProfile={{
          teamName: userData.name,
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={OpenChatBox}
        isOpen={isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        // pinMessage={{
        //   imageUrl:
        //     "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        //   title:
        //     "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        //   text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        // }}
        placeholder="Enter Message"
      />
      {/* <img className="demo-monster-img" src="" /> */}
    </div>
  );
};

export default Conversation;
