import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Mail, Lock, EyeOff, Eye, RotateCw } from "lucide-react";
import Authimgpatern from "../Authimgpatern";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showpass, setShowpass] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, isLoggining } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await login(formdata);

      if (res?.success) {
        navigate("/");
      } else {
        navigate("/errorpage");
      }
    } catch (err) {
      console.log("Login failed", err);
      navigate("/errorpage");
    }
  };

  return (
    <motion.div
      className="min-h-screen grid lg:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* LEFT SIDE */}
      <motion.div
        className="flex flex-col justify-center items-center p-6 sm:p-12"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md space-y-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login</h1>
              <p className="text-base-content/60">
                Welcome back! Please login to your account
              </p>
            </div>
          </div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* EMAIL */}
            <motion.div
              className="form-control"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 size-5 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="yourmail@gmail.com"
                  value={formdata.email}
                  onChange={(e) =>
                    setFormdata({ ...formdata, email: e.target.value })
                  }
                />
              </div>
            </motion.div>

            {/* PASSWORD */}
            <motion.div
              className="form-control"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 size-5 text-base-content/40" />
                <input
                  type={showpass ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formdata.password}
                  onChange={(e) =>
                    setFormdata({ ...formdata, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowpass(!showpass)}
                >
                  {showpass ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggining}
            >
              {isLoggining ? (
                <>
                  <RotateCw className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </motion.button>
          </motion.form>

          {/* SIGNUP LINK */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don’t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Authimgpatern
          titel="Join our community"
          subtitel="Connect with friends, share moments, and stay in touch with you"
        />
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
