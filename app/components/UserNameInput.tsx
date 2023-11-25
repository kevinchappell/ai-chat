import { useState } from "react";

export const UserNameInput = ({ saveUserName }: any) => {
  const [userName, setUserName] = useState<string>('');

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="p-4 max-w-md mx-auto dark:text-white">
        <label className="flex gap-2 my-2">What is your name?</label>
        <input
          type="text"
          className="px-2 flex-1 rounded-l h-12 text-gray-900"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveUserName(userName);
            }
          }}
          placeholder="Enter your name"
        />
        <button className="bg-blue-500 p-2 rounded-r h-12" onClick={() => saveUserName(userName)}>
          Save
        </button>
      </div>
    </div>
  );
}
