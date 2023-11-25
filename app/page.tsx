'use client'

import ChatInterface from './components/ChatInterface';
import { UserNameInput } from './components/UserNameInput';
import { useLocalStorage } from './hooks/useLocalStorage';

const Home = () => {
  const [userName, setUserName] = useLocalStorage('userName', '');

  return userName ? <ChatInterface userName={userName} /> : <UserNameInput saveUserName={setUserName} />;
};

export default Home;
