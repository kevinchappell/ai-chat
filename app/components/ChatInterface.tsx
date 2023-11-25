import { useState } from 'react';
import MessageArea from './MessageArea';
import MessageInput from './MessageInput';
import { Sidebar } from './Sidebar';

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen text-gray-900">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="w-full h-screen bg-[url('/chat-bg-3.png')]">
        <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm">
          <div className="flex w-full justify-between items-center bg-white p-4 border-b">
            <button className="text-2xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              ☰
            </button>
            <div className="text-2xl">Chat</div>
            <div className="w-8"></div>
          </div>
          <MessageArea />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
