import React from 'react';
import { MessageType } from '../types';
import classNames from 'classnames';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatBubbleProps {
  message: MessageType;
  isSender: boolean;
}

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message: { message, timestamp, isTyping }, isSender }) => {
  const today = new Date();
  const date = new Date(timestamp);
  const formattedDateTimeOptions = today.getDate() === date.getDate() ? timeOptions : dateTimeOptions
  const formattedDateTime = new Intl.DateTimeFormat("en-us", formattedDateTimeOptions).format(date)
  const formattedDateTimeFull = new Intl.DateTimeFormat("en-us", dateTimeOptions).format(date)

  return (
    <div className={classNames('chat-bubble max-w-[85%] relative', isSender ? 'right-bubble' : 'left-bubble')}>
      <div className="relative px-3 pt-2 text-white whitespace-pre-line">
        {typeof message === 'string' ? <MarkdownRenderer markdownText={message} /> : message}
      </div>
      {!isTyping && <span title={formattedDateTimeFull} className={classNames('text-slate-300 text-sm absolute right-3 bottom-1', isSender? 'right-3' : 'left-3')}>{formattedDateTime}</span>}
    </div>
  );
};
