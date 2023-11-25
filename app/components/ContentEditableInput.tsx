import { useEffect, useRef } from 'react';

interface ContentEditableInputProps {
  content: string;
  onChange: (content: string) => void;
  onSubmit: () => void;
}

export const ContentEditableInput = ({content, onChange, onSubmit}: ContentEditableInputProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const getProcessedContent = () => {
    if (!contentRef.current) return '';

    // Clone the node to not alter the original content
    const clonedNode = contentRef.current.cloneNode(true) as HTMLElement;

    // Replace <br> and block elements with newline characters
    clonedNode.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    clonedNode.querySelectorAll('div').forEach(div => div.replaceWith('\n', ...Array.from(div.childNodes)));

    return clonedNode.textContent ?? '';
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(getProcessedContent());
  };

  const getCaretPosition = (element: HTMLElement) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  };

  const insertAtCaret = (text: string) => {
    const currentContent = contentRef.current;
    if (currentContent) {
      const caretPos = getCaretPosition(currentContent);
      const newText = content.slice(0, caretPos) + text + content.slice(caretPos);
      onChange(newText);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    insertAtCaret(text);
  };



  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit()
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.textContent = content
    }
  }, [content])


  return (
    <div
        contentEditable
        ref={contentRef}
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        className="rounded border p-2 flex-1 shadow"
        role="textbox"
        aria-multiline="true"
      />
  );
};
