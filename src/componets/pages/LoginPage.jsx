import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link,useNavigate } from "react-router-dom";
import { MessageSquare,  Mail, Lock, EyeOff, Eye, RotateCw } from "lucide-react";
import Authimgpatern from "../Authimgpatern";
//import toast from "react-hot-toast";
const LoginPage = () => {
  const [showpass, setShowpass]=useState(false);
  const [formdata,setFormdata]=useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();
  const {login, isLoggining}=useAuthStore();
  const handleSubmit=async (e)=>{
    e.priventDeafult();
    login(formdata);
    
    if ( login(formdata)) {
      // Redirect to homepage if login is successful
      navigate('/');  // '/' is typically the homepage route
    } else {
      // Handle the case where login fails
      console.log("Login failed");
    }
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-8"
                placeholder="yourmail@gmail.com"
                value={formdata.email}
                onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showpass ? "text" : "password"}
                className="input input-bordered w-full pl-8"
                placeholder="........"
                value={formdata.password}
                onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowpass(!showpass)}
                aria-label="Toggle password visibility"
              >
                {showpass ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={isLoggining}>
            {isLoggining ? (
              <>
              <RotateCw className="size-5 animate-bounce" />
              Loading........
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign-in Link */}
        <div className="text-center">
          <p className="text-base-content/60">
            Dont have an account ?{" "}
            <Link to="/signup" className="link link-primary">
             Signup
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* Right-side Image */}
    <Authimgpatern
      titel="Join our community"
      subtitel="Connect with friends, share moments, and stay in touch with you"
    />
  </div>
  )
}

export default LoginPage
