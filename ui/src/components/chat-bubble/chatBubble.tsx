import { BelongsTo } from "../../enums/chatBubble"

type ChatBubbleProps = {
  belongsTo: BelongsTo,
  textDisplay: string
}

type ColorScheme = {
  [key: string]: string
} 

function ChatBubble(props: ChatBubbleProps) {
  const bgColor: ColorScheme = {
    user: 'bg-user-bubble',
    waifu: 'bg-waifu-bubble'
  }

  const textColor: ColorScheme = {
    user: 'text-user-bubble-text',
    waifu: 'text-waifu-bubble-text'
  }

  return(
    <div className={`flex rounded-xl p-4 max-w-fit ${bgColor[props.belongsTo.toLowerCase()]}`}>
      <p className={`text-base text-justify ${textColor[props.belongsTo.toLowerCase()]} break-words`}>
        {props.textDisplay} 
      </p>
    </div>
  )
}

export default ChatBubble