import { UserCircle2 } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import Skeleton from "./Skeleton/Skeleton";
import Online from "./Online";
const Sidebar = () => {
  const { selectedUser, getUsers, users, isUsersLoading, setSelectedUser } = useChat();
  const { onlineUsers } = useAuth();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0 overflow-y-auto">
      <Online/>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">All Users</h3>
        <div className="space-y-3">
          {users?.map((user, index) => {
           return <div
              onClick={() => setSelectedUser(user)}
              key={index}
              className={`${
                selectedUser?._id == user?._id
                  ? "ring-indigo-400 ring-2 bg-indigo-300 hover:bg-indigo-500/30"
                  : ""
              } flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-100 p-3 rounded-lg`}
            >
              
                {user.profilePic ? (
                  <img
                    className="bg-contain rounded-full w-10 h-10"
                    src={user.profilePic}
                  />

                ) : (
                  <UserCircle2 className="w-10 h-10 text-indigo-600" />
                )}

              <div className="flex flex-col justify-start items-start ">
                  <span className="font-medium font-serif  text-[0.875rem] ">
                    {user.fullName}
                  </span>
              </div>
            </div>
           })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
