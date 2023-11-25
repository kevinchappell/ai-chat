import classNames from "classnames";

interface JumpToBottomButtonProps {
  onClick: () => void;
  className: string;
}

export const JumpToBottomButton = ({onClick, className}: JumpToBottomButtonProps) => {
  return (
      <div className={classNames('sticky bottom-4 right-4 flex justify-end text-black dark:text-white leading-0 min-height-6', className)}>
        <button onClick={onClick} className="rounded-full bg-sky-500 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
  )
}
