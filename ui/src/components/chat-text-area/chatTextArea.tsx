import { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';

interface ChatTextAreaProps {
  lockSendResponse: boolean,
  onUserSendResponse: (arg: { currentText: string }) => void,
}

const ChatTextArea = observer(({ onUserSendResponse, lockSendResponse }: ChatTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textContent, setTextContent] = useState('');

  const handleSend = () => {
    onUserSendResponse({ currentText: textContent });
    setTextContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (!lockSendResponse) {
        handleSend();
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';

      const newHeight = Math.min(textareaRef.current.scrollHeight, 100);
      textareaRef.current.style.height = `${newHeight}px`;

      const outerDiv = textareaRef.current.parentElement;

      if (outerDiv) {
        outerDiv.style.height = `${newHeight + 25}px`;
      }
    }
  }, [textContent]);

  return (
    <div className="flex flex-nowrap items-center rounded
    w-full max-h-32 px-4 py-1 space-x-4 bg-user-bubble relative"
    >
      <textarea
        className="basis-11/12 h-full border-transparent bg-transparent
        outline-none font-semibold m-0 text-user-bubble-text resize-none"
        ref={textareaRef}
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message your waifu"
        rows={1}
      />
      <button
        type="button"
        disabled={lockSendResponse}
        className="basis-1/12 text-primary-text-color bg-primary-color/80
        hover:bg-primary-color/90 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={handleSend}
      >
        SEND
      </button>
    </div>
  );
});

export default ChatTextArea;
