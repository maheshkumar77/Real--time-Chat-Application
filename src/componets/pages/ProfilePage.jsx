import { useAuthStore } from "../../store/useAuthStore";
import { Camera } from 'lucide-react'
import {  User, Mail } from "lucide-react";

const ProfilePage = () => {
  const { authUser,isUpdatingProfile,updateprofile }=useAuthStore();
  const handleImageupload= async(e)=>{
    
  }
  return (
    <div className=" h-screen w-screen flex justify-center items-center pt-20">
     <div className=" w-1/3  max-w-6xl mx-auto p-4 py-8 bg-black rounded-lg">
      <div className=" text-center">
        <h1 className=" text-2xl font-semibold ">Profile</h1>
        <p className=" mt-2">Your profile information</p>
      </div>
      {/* avtaraupload */}
      <div className=" flex flex-col items-center gap-4">
        <div className=" relative">
          <img src={authUser.profilepic || "/avtar.png"}
          alt="profile"
          className=" size-32 rounded-full object-cover border-4"/>
          <label 
          htmlFor="avtar-upload"
          className={`absolute bottom-0 right-0 bg-base-content 
           hover:scale-105 p-2 rounded-full cursor-pointer 
            transition-all duration-200
             ${isUpdatingProfile ? " animate-pulse pointer-events-none" : ""}`}>
           

           <Camera className=" w-5 h-5 text-base-200"/>
           <input
           type="file"
           id="avtar-upload"
           className=" hidden"
           accept="image/*"
           onChange={handleImageupload}
           disabled={isUpdatingProfile}
           />


             </label>

        </div>
        <p className=" text-sm text-zinc-400">
          {isUpdatingProfile ? "uploading....":"click the cemera to update your photo"}
        </p>
      </div>
      <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <div>
                <p className=" px-10 py-2.5 bg-base-200 rounded-lg border" >{authUser?.fullname}</p>
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <div>
                <p className=" px-10 py-2.5 bg-base-200 rounded-lg border" >{authUser?.email}</p>
              </div>
              </div>
              <div className=" mt-6 bg-base-300 rounded-xl p-6">
                <h2 className=" text-lg font-medium mb-4">
                  Account information
                </h2>
                <div className=" space-y-3 text-sm">
                  <div className=" flex items-center justify-between py-2 border-b border-x-zinc-700">
                    <span>Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </div>
                  <span>Account Status</span>
                  <span className=" text-green-500 px-3 ">Active</span>
                </div>
              </div>
            </div>
          </div>
     </div>
    </div>
  )
}

export default ProfilePage
