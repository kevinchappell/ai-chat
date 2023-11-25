import React from 'react'

export enum SendTypes {
  USER = 'User',
  AI = 'AI',
}

export type MessageType = {
  id: string
  sender: SendTypes
  message: string | React.ReactNode
  timestamp: string
  isTyping?: boolean
}

export type ChatContextType = {
  messages: MessageType[]
  sendMessage: (content: string) => void
}
