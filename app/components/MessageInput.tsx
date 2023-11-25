import { useCallback, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';
import { ContentEditableInput } from './ContentEditableInput';

const MessageInput = () => {
  const [content, setContent] = useState<string>('');
  const { sendMessage } = useChat();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSend = useCallback(() => {
    sendMessage(content);
    setContent('');
    if (contentRef.current) {
      contentRef.current.innerHTML = ''
    }
  }, [sendMessage, content]);

  return (
    <div className="flex p-6 bg-white w-full justify-center border-solid border-t-2 border-slate-300">
      <div className="flex gap-1 w-full">
        <ContentEditableInput content={content} onChange={setContent} onSubmit={handleSend} />
        <div className="flex flex-col justify-end">
          <button className="rounded-full bg-blue-500 text-white p-2" onClick={handleSend}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
