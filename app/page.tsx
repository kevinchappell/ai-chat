'use client'

import { useLocalStorage } from '@react-hooks-library/core'
import ChatInterface from './components/ChatInterface';
import { UserNameInput } from './components/UserNameInput';

const Home = () => {
  const [userName, setUserName] = useLocalStorage('userName', '');

  return userName ? <ChatInterface userName={userName} /> : <UserNameInput saveUserName={setUserName} />;
};

export default Home;
