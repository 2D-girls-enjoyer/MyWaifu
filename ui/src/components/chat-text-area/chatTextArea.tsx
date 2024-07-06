import React, { useState, useRef, useEffect } from "react";

function ChatTextArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textContent, setTextContent] = useState('');

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
    w-full max-h-32 px-4 py-1 space-x-4 bg-user-bubble relative">
      <textarea
        className="basis-10/12 h-full border-transparent bg-transparent
        outline-none font-semibold m-0 text-user-bubble-text resize-none"
        ref={textareaRef}
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="Message your waifu"
        rows={1}
      />

    </div>
  )
}

export default ChatTextArea
