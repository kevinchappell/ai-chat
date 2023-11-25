import React, { useState, useEffect, useCallback } from 'react'

function useIsScrolledToBottom(ref: React.RefObject<HTMLElement>) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)

  const checkIfScrolledToBottom = useCallback(() => {
    if (!ref.current) {
      return
    }
    const { scrollTop, scrollHeight, clientHeight } = ref.current
    setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight)
  }, [ref])

  useEffect(() => {
    const element = ref.current
    if (element) {
      element.addEventListener('scroll', checkIfScrolledToBottom)
      checkIfScrolledToBottom() // Initial check
    }

    return () => {
      element?.removeEventListener('scroll', checkIfScrolledToBottom)
    }
  }, [ref, checkIfScrolledToBottom])

  return isScrolledToBottom
}

export default useIsScrolledToBottom
