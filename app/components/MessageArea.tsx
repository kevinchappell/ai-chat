import { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { SendTypes } from '../types';
import { ChatBubble } from './ChatBubble';
import classNames from 'classnames';
import useIsScrolledToBottom from '../hooks/useIsScrolledBottom';
import { JumpToBottomButton } from './JumpToBottomButton';

const MessageArea = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolledToBottom = useIsScrolledToBottom(scrollRef);
  const { messages } = useChat();
  const hasMessages = !!messages.length;

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  return (
    <div ref={scrollRef} className={classNames('space-y-2 px-4 pt-4 pb-0 flex-grow grid gap-8 w-full overflow-auto relative')}>
      {!hasMessages && <div className="text-center text-gray-500">No messages yet</div>}
      {messages.map((msg) => <ChatBubble key={msg.id} message={msg} isSender={msg.sender === SendTypes.USER} />)}
      {<JumpToBottomButton onClick={scrollToBottom} className={isScrolledToBottom ? 'opacity-0 pointer-events-none' : ''} />}
    </div>
  );
};

export default MessageArea;
