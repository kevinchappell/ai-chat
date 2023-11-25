import { FC } from 'react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: FC<SidebarProps> = ({isOpen}: SidebarProps) => {
  const handleClickResetButton = () => {
    window.localStorage.clear();
    window.location.reload();
  }

return (
  <aside className={`transition-width duration-300 ${isOpen ? 'w-64' : 'w-0'}`} aria-label="Sidebar">
    <div className="overflow-y-auto bg-gray-50 rounded dark:bg-gray-800">
      <ul className="m-0 p-0">
        <li>
          <button className="flex items-center p-4 text-base font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full" onClick={handleClickResetButton}>
            Reset
          </button>
        </li>
      </ul>
    </div>
  </aside>
  );
};
