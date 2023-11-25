'use client'

import ChatInterface from './components/ChatInterface';
import { UserNameInput } from './components/UserNameInput';
import { ChatProvider } from './context/ChatContext';
import { useLocalStorage } from './hooks/useLocalStorage';

const Home = () => {
  const [userName, setUserName] = useLocalStorage('userName', '');

  return (
    <ChatProvider>
        {userName ? <ChatInterface /> : <UserNameInput saveUserName={setUserName} />}
    </ChatProvider>
  );
};

export default Home;
