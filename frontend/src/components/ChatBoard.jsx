import { useChat } from '../hooks/useChat';
import { useEffect, useRef } from 'react';
import ChatTopBar from './ChatTopBar';
import MessageInputBox from './MessageInputBox'
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatter';
import ChatMessageBubble from './ChatBubbleMessage';
const ChatBoard = ({user}) => {
  const {AuthenticatedUser} = useAuth()
  const {messages, getMessages, selectedUser, subscribeToMessages, unsubscribeToMessage} = useChat();
  const bottomRef = useRef();
  useEffect(() => {
       getMessages(selectedUser._id);
       subscribeToMessages();
       return () => unsubscribeToMessage()
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessage]);
 
  useEffect(() => {
    if (bottomRef.current && messages) {
        bottomRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages])

  return (
    <main className="flex-1 flex flex-col justify-between p-6 bg-white">
        <ChatTopBar user={user}/>   
        <div  className='flex max-h-screen overflow-y-auto scroller justify-around flex-col h-full'>
               <div className='flex-1  p-4 space-y-6 '>
                  {messages.map((message) => {
                      return <ChatMessageBubble key={message._id} isSender={message?.senderId == AuthenticatedUser?._id} image={message.image} time={formatDate(message.createdAt)} selectedUser={selectedUser} message={message.text}/>
                  })}
                  <div ref={bottomRef}></div>
               </div>
        </div>     

        <MessageInputBox/>
      </main>
  )
}

export default ChatBoard