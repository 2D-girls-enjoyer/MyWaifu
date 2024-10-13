import { BelongsTo } from '../../models/enums/chatBubble';

type ChatBubbleProps = {
  belongsTo: BelongsTo,
  textDisplay: string
};

type ColorScheme = {
  [key: string]: string
};

function ChatBubble({ belongsTo, textDisplay }: ChatBubbleProps) {
  const bgColor: ColorScheme = {
    user: 'bg-user-bubble',
    waifu: 'bg-waifu-bubble',
  };

  const textColor: ColorScheme = {
    user: 'text-user-bubble-text',
    waifu: 'text-waifu-bubble-text',
  };

  return (
    <div className={`flex rounded-xl p-4 w-1/2 max-w-fit ${bgColor[belongsTo.toLowerCase()]}`}>
      <p className={`text-base text-justify ${textColor[belongsTo.toLowerCase()]} break-words`}>
        {textDisplay}
      </p>
    </div>
  );
}

export default ChatBubble;
