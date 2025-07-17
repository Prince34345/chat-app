import { Info, UserCircle2, X } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import placeholder from '../assets/img.jpg';

const ChatTopBar = ({user}) => {
  const {onOpen} = useModal();
  const {onlineUsers} = useAuth();
  const {setSelectedUser} = useChat(); 
  return (
     <div className="flex items-center justify-between border-b-indigo-500 border-b-[.8px] pb-4 mb-4">
          <div className="flex items-center gap-3">
           {user.profilePic ? <img alt={user.fullName} className='bg-contain rounded-full w-10 h-10' src={user.profilePic || placeholder}/> : <UserCircle2 className="w-10 h-10 text-indigo-500" />}
            <div>
              <h3 className="font-semibold">{user.fullName}</h3>
              <p className="text-sm text-gray-400">{onlineUsers?.includes(user._id) ? "Online" : "Offline"}</p>
            </div>
          </div>
          <div className="flex gap-4  text-gray-500">
            <Info
              className="w-5 h-5 cursor-pointer"
              onClick={onOpen}
            />
          <X className='w-5 h-5 cursor-pointer'
             onClick={() => setSelectedUser(null)}
          />
          </div>
        </div>
  )
}

export default ChatTopBar