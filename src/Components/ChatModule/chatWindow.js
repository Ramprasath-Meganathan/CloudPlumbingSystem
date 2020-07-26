import React, { useEffect, useState } from "react";
import { Launcher } from "react-chat-window";
import Sockette from "sockette";
let ws = null;

const ChatWindow = props => {
  const [messageList, setMessageList] = useState([]);
  const [badge, setBadge] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const username= localStorage.getItem("email")
  //const { username } = props.authData;
  //const username='pavan'
  useEffect(
    () => {
      console.log(username)
      //if (props.authData)
      if (username)
        ws = new Sockette(
          "wss://gfcs99umtf.execute-api.us-east-1.amazonaws.com/dev?token=" //+props.authData.signInUserSession.accessToken.jwtToken
          ,
          {
            timeout: 5e3,
            maxAttempts: 1,
            onopen: e => console.log("connected:", e),
            onmessage: e => onMessageReceied(e),
            onreconnect: e => console.log("Reconnecting...", e),
            onmaximum: e => console.log("Stop Attempting!", e),
            onclose: e => console.log("Closed!", e),
            onerror: e => console.log("Error:", e)
          }
        );
      return function cleanup() {
        ws && ws.close();
        ws = null;
      };
    },
    [messageList]
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
    setBadge(0);
  };

  const onMessageWasSent = message => {
    const {author,data,type}=message
    const {text}=data
    const newdatawithauthor='('+username+')'+text
    const newdata={}
    
    let newDataMessage={}
    if(type==='text')
    {
       newDataMessage={
        author:username,
        data:{
          text:newdatawithauthor
        },
        type: type
      }
    }
    else {
       newDataMessage={
        author:username,
        data:data,
        type: type
      }
    }
    
    console.log('newDataMessage'+newDataMessage.author)
   // let messagedata=message +'pavan'
    const newMessage = { ...message, author: username };
    console.log('new Message'+newMessage.author)
    ws.json({
      action: "sendMessage",
      data: JSON.stringify(newDataMessage)
    });
  };

  const onMessageReceied = ({ data }) => {
    const { author, type, data: messageData } = JSON.parse(data);
    console.log('onMessageReceived:'+author)
    console.log('messagedata'+JSON.stringify(messageData))
    let newdata={
      emoji:messageData.emoji
    }
    //console.log('onMessageReceived:'+messageData.text)
    const isMe = username === author ? "me" : "them";
    let updateddata=''
    if(type==='text')
    {
      if(username===author)
      {
      updateddata= messageData.text.replace(/ *\([^)]*\) */g, "");
       console.log('updateddata'+updateddata)
      }
      else{
        updateddata=messageData.text
        console.log('updated data'+updateddata)
      }
      newdata={
        text: updateddata
      }
    }
    
    
    if (!isOpen) {
      setBadge(+badge + 1);
    }
    setMessageList([
      ...messageList,
      {
        author: isMe,
        type,
        data: newdata
      }
    ]);
  };
  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "LMS-Messenger",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messageList}
        handleClick={handleClick}
        isOpen={isOpen}
        showEmoji
        newMessagesCount={badge}
      />
    </div>
  );
};

export default ChatWindow;
