
import ShowModal from "./ShowModal";

import { useChat } from "../hooks/useChat";
import Sidebar from "./Sidebar";
import ChatBoard from "./ChatBoard";
import NoChats from "./NoChats";
import placeholder from '../assets/img.jpg'
export default function HomePage() {
  const {selectedUser} = useChat();
   return (
    <>
     <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar/>     
      {selectedUser ? <ChatBoard user={selectedUser}/> : <NoChats/>}
    </div>
    <ShowModal>
          <img
            src={selectedUser?.profilePic || placeholder}
            alt={selectedUser?.fullName}
            className="w-28 h-28 rounded-full object-cover mb-6 shadow-lg"
          />
           <h1> Hello I am <span className="text-indigo-500 text-2xl font-bold">{selectedUser?.fullName}</span></h1>

          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedUser?.fullname}
          </h2>

          <p className="text-sm text-gray-600 mb-2">{selectedUser?.email}</p>

          <div className="mt-4 text-gray-700 text-sm leading-relaxed max-w-md">
            <p>
              This is the profile information of the selected user. You can view
              their public contact details, current status, and use this info to
              start a conversation or learn more.
            </p>
           
          </div>
    </ShowModal>  
    </>
  );
}