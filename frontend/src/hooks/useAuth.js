import { create } from "zustand";
import { AxiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuth = create((set, get) => ({
    AuthenticatedUser: null,
    isLoadingUser: true,
    isSigningUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,
    checkandSetAuth: async () => {
        try {
            const response = await AxiosInstance.get("/auth/check-auth", {withCredentials: true});
            set({AuthenticatedUser: response.data});
            get().connectSocket();
        } catch (error) {
            set({AuthenticatedUser: null})
        } finally {
            set({isLoadingUser: false})
        }
    },
    signingUp : async (data) => {
        set({isSigningUp: true})
        try {
            const res = await AxiosInstance.post("/auth/signup", data, {withCredentials: true});            
            toast.success("Accounted Created Successfully")
            set({AuthenticatedUser: res.data});

            get().connectSocket();
        } catch (error) {
            console.log(error, "Here is Error on Signup")
            set({AuthenticatedUser: null});
        }finally {
            set({isSigningUp: false})
        }
    },
    isLoggingIn: async (data) => {
       set({isLoggedIn: true});
       try {
         const res = await AxiosInstance.post("/auth/login", data, {withCredentials: true});
         toast.success("Login Successfully");
         set({AuthenticatedUser: res.data});
         get().connectSocket();
       } catch (error) {
         toast.error("Failed to Login")
         set({AuthenticatedUser: null});
       } finally {
         set({isLoggedIn: false});
       }
    },
    loggedOut: async () => {
        try {
            await AxiosInstance.post("/auth/logout");
            set({AuthenticatedUser: null});
            toast.success("Logging out Successfully");
            get().disconnectSocket();
        } catch (error) {

              console.log(error);
              toast.error("Unsuccessful to logout.")
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await AxiosInstance.put('/auth/update-profile-pic', data)
            set({AuthenticatedUser: res.data});
            toast.success("Successfully updating profile.");
            get().disconnectSocket()
        } catch (error) {
            console.log(error)
            toast.error(error);
        } finally {
            set({isUpdatingProfile: false});
        }
    },
    connectSocket: () => {
       const {AuthenticatedUser} = get();
       if (!AuthenticatedUser || get().socket?.connected) return
       const socket = io(BASE_URL, {query: {userId: AuthenticatedUser._id}});
       socket.connect();

       set({socket: socket});

       socket.on("getOnlineUsers", (usersIds) => {
           set({onlineUsers: usersIds});
       })

    },  
    disconnectSocket: () => {
       if (get().socket?.connected) {
            get().socket.disconnect()
       }
    }
}))