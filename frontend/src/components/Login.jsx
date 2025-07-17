import  { useState } from "react";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import JoinCommunityGrid from "./JoinCommunity";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forms, setforms] = useState({
     email: "",
     password: ""
  });

  const { isLoggingIn, isLoggedIn} = useAuth();
  const validate = () => {
    if (!forms.password || !forms.email) { return toast.error("All fields must not be empty."); }
    if (!/\S+@\S+\.\S+/.test(forms.email)) { return toast.error("Email is Invalid format") }
    if (forms.password.length < 6) { return toast.error("Password must be atleast 6 character.");}
    return true;
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      const success = validate();
      if (success === true) {
          isLoggingIn(forms)
      }
  }
  return (
   <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex flex-col md:flex-row items-center justify-center p-4 gap-8">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg">Welcome Back, Please Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-semibold text-white/80">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              value={forms.email}
              onChange={(e) => {setforms({...forms, email: e.target.value})}}
              type="email"
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="you@example.com"
            />
            <p className="text-sm text-red-300 mt-1">Please enter a valid email address.</p>
          </div>
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-semibold text-white/80">
              <Lock className="w-4 h-4" /> Password
            </label>
            <div className="relative">
              <input
                value={forms.password}
                onChange={(e) => {setforms({...forms, password: e.target.value})}}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-red-300 mt-1">Password must be at least 6 characters long.</p>
          </div>
          <button
            disabled={isLoggedIn}
            type="submit"
            className="w-full py-2 bg-yellow-300 text-purple-800 font-bold rounded-xl hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-md"
          >
            {isLoggedIn ? "Loading..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white/70">
          Already have an account? <Link to={"/signup"} className="underline text-yellow-300 hover:text-yellow-400">Sign In</Link>
        </p>
      </div>

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-white gap-6 p-10">
        <h3 className="text-2xl font-bold text-center mt-6 mb-2">Join Our Community</h3>
        <p className="text-center text-white/70 mb-4">Connect, share and grow with others!</p>
        <JoinCommunityGrid />
      </div>
    </div>
  );
}