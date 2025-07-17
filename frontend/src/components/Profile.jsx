import { useState } from "react";
import { User, Mail,  Upload } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import placeholderImg from '../assets/img.jpg';
export default function ProfileSection() {
  const {AuthenticatedUser, isUpdatingProfile, updateProfile} = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
      const file = e?.target?.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({profilePic: base64Image});
      }
  }
  return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-3xl text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Profile Settings</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="-mt-10 w-40 h-40 rounded-full overflow-hidden border-4 border-white/40">
              <img
                src={AuthenticatedUser.profilePic || selectedImg || placeholderImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <button>
              <input accept="image/*" onChange={handleImageUpload} id="avatar-upload" type="file" className="hidden" />
              <label
                htmlFor="avatar-upload"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-300 text-purple-800 font-semibold rounded-xl cursor-pointer hover:bg-yellow-400 transition"
              >
                {!isUpdatingProfile ? <><Upload className="w-4 h-4" /> Change Avatar</> : "uploading..."}
              </label>
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-semibold text-white/80">
                <User className="w-4 h-4" /> Username
              </label>
              <input
                value={AuthenticatedUser.fullName}
                type="text"
                placeholder="YourUsername"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm font-semibold text-white/80">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                value={AuthenticatedUser.email}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-white/80 max-w-xl">
        <p>
          Keep your profile information up to date to get the best experience.
          You can change your avatar, username and email here. Your data remains
          private and secure.
        </p>
      </div>
    </div>
  );
}

