'use client'

import { createContext, useCallback, useContext, useMemo } from 'react';
import { ChatContextType, MessageType, SendTypes } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { api } from '../utils/api';
import { TypingIndicator } from '../components/TypingIndicator';

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);
const makeMessage = (message: string | JSX.Element, sender: SendTypes, isTyping?: boolean): MessageType => ({ id: window.crypto.randomUUID(), sender, message, timestamp: new Date().toISOString(), isTyping });

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages]  = useLocalStorage<MessageType[]>('messages', []);

  const sendMessage = useCallback((content: string) => {
    const userMessage = makeMessage(content, SendTypes.USER);
    const aiTypingMessage = makeMessage(<TypingIndicator />, SendTypes.AI, true);
    setMessages((prev) => [...prev, userMessage, aiTypingMessage]);
    api.post('/chat/completions', userMessage).then((resp) => {
      if (!resp?.data) return;
      const aiMessage = makeMessage(resp.data.content, SendTypes.AI);
      setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
    });
  }, [setMessages]);

  const value = useMemo(() => ({ messages, sendMessage }), [messages, sendMessage]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
