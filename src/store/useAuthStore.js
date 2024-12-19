import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // Check authentication status
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); // Check if user is logged in
      set({ authUser: res.data }); // Assuming `res.data` holds user data
    } catch (error) {
      console.log("Error in CheckAuth:", error);
      set({ authUser: null }); // Set authUser to null if error occurs
    } finally {
      set({ isCheckingAuth: false }); // Stop loading after check
    }
  },

  // Signup logic
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data }); // Assuming the response contains user data
      toast.success("Account Created Successfully");
    } catch (error) {
      
      toast.error(error.response?.data?.message || "An error occurred during signup.");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data)=>{
    set({isLoggingIn: true});
try{
 const res =await axiosInstance.post("/auth/login", data);
 set({authUser: res.data});
 toast.success("Logged in successfuly");

}catch(error){
 toast.error(error.response?.data?.message || "An error occurred during logout.");
}finally{
  set({ isLoggingIn: false});
}


  },





logout: async ()=>{
try{
await axiosInstance.post("/auth/logout");
set({ authUser: null});
toast.success("Logged out sucessfully");
}catch(error){
    toast.error(error.response?.data?.message || "An error occurred during logout.");
}
},
  
}));
