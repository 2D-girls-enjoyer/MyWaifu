import ChatBubble from "../../components/chat-bubble/chatBubble"
import { BelongsTo } from "../../enums/chatBubble"

function MainChat() {
  return (
    <div className="w-full h-full bg-chat-background">
      <ChatBubble belongsTo={BelongsTo.USER} textDisplay="HELLLO" />
    </div>
  )
  
}

export default MainChat
