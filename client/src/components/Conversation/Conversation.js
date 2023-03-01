import React, { useEffect, useState } from "react";
import { Launcher } from "popup-chat-react";
import { sendMessage1 } from "../../utils/API_CALLS";
import { getMessages } from "../../utils/API_CALLS";

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

  const helper = async (messageData) => {
    await sendMessage1(messageData);
  };

  function onMessageWasSent(message) {
    console.log(message);
    const data = message.data.text;
    const sender = sessionStorage.getItem("userid");
    const receiver = userData._id;
    // console.log(sender, receiver, data);
    helper({ data, receiver, sender });
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

  function sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = state.isOpen
        ? state.newMessagesCount
        : state.newMessagesCount + 1;

      setState((state) => ({
        ...state,
        newMessagesCount: newMessagesCount,
        messageList: [
          ...state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      }));
    }
  }

  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0,
    }));
  }

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
