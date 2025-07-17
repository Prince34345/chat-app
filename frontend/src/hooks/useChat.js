import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosInstance } from "../utils/axios";
import { useAuth } from "./useAuth";


export const useChat = create((set, get) => ({
      messages: [],
      users: [],
      selectedUser: null,
      isUsersLoading: false,
      isMessagesLoading: false,
      setSelectedUser: (selectedUser) => {
         set({selectedUser});
      },
      sendMessage: async (messageData) => {
          const {selectedUser, messages} = get();
          try {
            const res = await AxiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
          } catch (error) {
            console.log(error);
            toast.error(error);
          }
      },
      getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res = await AxiosInstance.get("/messages/users");
            set({users: res.data}); 
        } catch (error) {
            console.log(error);
            toast.error(error);
        } finally {
           set({isUsersLoading: false});
        }
      },
      getMessages: async (userId) => {
           set({isMessagesLoading: true});
           try {
              const res = await AxiosInstance.get(`/messages/${userId}`);
              set({messages: res.data});
           } catch (error) {
              console.log(error);
              toast.error(error);
           } finally {
              set({isMessagesLoading: false})
           }
      },
      subscribeToMessages: () => {
         const {selectedUser} = get();
         if (!selectedUser) return;
         const socket = useAuth.getState().socket;

         socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) {
               return
            }
            set({messages: [...get().messages, newMessage]})
         });
      },
      unsubscribeToMessage: () => {
         const socket = useAuth.getState().socket;
         socket.off("newMessage");
      }
}))