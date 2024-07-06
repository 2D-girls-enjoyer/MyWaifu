import React, { useReducer } from 'react';
import ChatBubble from "../../components/chat-bubble/chatBubble"
import ChatTextArea from "../../components/chat-text-area/chatTextArea"
import { BelongsTo } from "../../enums/chatBubble"



function MainChat() {
  return (
    <div className="flex flex-col w-full h-full bg-chat-background">
      <div className="basis-10/12">
        <ChatBubble belongsTo={BelongsTo.USER} textDisplay="HELLLO" />
      </div>
       <div className="flex items-end basis-2/12 px-2 pb-8">
        <ChatTextArea/>
       </div>
    </div>
  )
  
}

export default MainChat
