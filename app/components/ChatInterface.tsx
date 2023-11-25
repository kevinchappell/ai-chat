import { useState } from 'react';
import Image from 'next/image';
import MessageArea from './MessageArea';
import MessageInput from './MessageInput';
import { Sidebar } from './Sidebar';
import { ChatProvider } from '../context/ChatContext';

interface ChatInterfaceProps {
  userName: string;
}

const ChatInterface = ({userName}: ChatInterfaceProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <ChatProvider userName={userName}>
      <div className="flex h-screen text-gray-900">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="w-full h-screen bg-[url('/chat-bg-3.png')]">
          <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm">
            <div className="flex w-full justify-between items-center bg-white p-4 border-b">
              <button className="text-2xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                ☰
              </button>
              <div className="text-2xl flex gap-2 items-center">
                <Image className="w-10 h-10 rounded-full" src="/ai-chat-avatar.png" width={32} height={32} alt="Talia" />
                Talia - AI
              </div>
              <div className="w-8"></div>
            </div>
            <MessageArea />
            <MessageInput />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default ChatInterface;
