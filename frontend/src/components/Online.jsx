import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useChat } from '../hooks/useChat';
import { UserCircle2 } from 'lucide-react';

const OnlineComponent = ({index, user}) => {
   return <li
          key={index}
          className="flex items-center bg-green-100 rounded-md p-2"
        >
          <div className="relative w-10 h-10">
           {user?.profilePic ?
            <img
              src={user?.profilePic}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            /> : <UserCircle2 className='w-10 h-10 text-green-500' /> }
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <span className="ml-3 text-gray-800 font-medium font-serif">{user?.fullName}</span>
        </li>      
}

const Online = () => {
  const {AuthenticatedUser, onlineUsers} = useAuth();
  const {users} = useChat();
  return (
  <ul className="space-y-3 mb-5">
      <h1>Online Users</h1>
      <OnlineComponent user={AuthenticatedUser} index={AuthenticatedUser._id}/>
      {users.map((user, index) => {
        if (onlineUsers?.includes(user._id)) {
             return <OnlineComponent user={user} index={index} />
        }
      })}
    </ul>
  )
}

export default Online