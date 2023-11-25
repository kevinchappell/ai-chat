'use client'

import { createContext, useCallback, useContext, useMemo } from 'react';
import { ChatContextType, MessageType, SendTypes } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { api } from '../utils/api';
import { TypingIndicator } from '../components/TypingIndicator';

interface ChatProviderProps {
  children: React.ReactNode;
  userName: string;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);
const makeMessage = (message: string | JSX.Element, sender: SendTypes, isTyping?: boolean): MessageType => ({ id: window.crypto.randomUUID(), sender, message, timestamp: new Date().toISOString(), isTyping });
const welcomeMessage = (userName: string) => `
Hi ${userName}, I'm Talia, a chatbot that can help you with your NextJS an TailwindCSS projects.
What are you working on today?
`

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children, userName }: ChatProviderProps) => {
  const defaultMessage = makeMessage(welcomeMessage(userName), SendTypes.AI);
  const [messages, setMessages]  = useLocalStorage<MessageType[]>('messages', [defaultMessage]);

  const sendMessage = useCallback((content: string) => {
    const userMessage = makeMessage(content, SendTypes.USER);
    const aiTypingMessage = makeMessage(<TypingIndicator />, SendTypes.AI, true);
    setMessages((prev) => [...prev, userMessage, aiTypingMessage]);
    api.post('/chat/completions', userMessage).then((resp) => {
      if (!resp?.data) {
        const message = makeMessage('Sorry, I did not understand that.', SendTypes.AI);
        return setMessages((prev) => [...prev.slice(0, -1), message]);
      };
      const aiMessage = makeMessage(resp.data.content, SendTypes.AI);
      setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
    });
  }, [setMessages]);

  const value = useMemo(() => ({ messages, sendMessage }), [messages, sendMessage]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
