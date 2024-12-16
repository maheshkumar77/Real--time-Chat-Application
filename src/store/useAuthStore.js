import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,  // Fixed the typo here
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // Fixed the typo in the endpoint here
            set({ authUser: res.data }); // Assuming `res.data` holds user data
        } catch (error) {
            console.log("Error in CheckAuth:", error);
            set({ authUser: null }); // Set authUser to null on error
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));
