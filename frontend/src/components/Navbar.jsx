import React from 'react';
import { MessageCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import {UserCheck2, LogOutIcon} from 'lucide-react'
import { Link } from 'react-router-dom';
export default function Navbar() {
  const {AuthenticatedUser, loggedOut} = useAuth();
  const handleLogout =  () => {
    console.log('Logging out...');
    if (AuthenticatedUser) {
        loggedOut();
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">ChatApp</span>
          </div>

          {/* Nav Items */}

          { 
           AuthenticatedUser && <div className="flex items-center space-x-6">
            <Link 
            to={"/"}
            className='text-white hover:bg-gray-400/20 p-5 flex justify-center items-center gap-2 hover:text-yellow-300 font-semibold transition-colors duration-200'>
            <MessageCircle />
            Messages
            </Link>
            <Link
              to="/profile"
              className="text-white hover:bg-gray-400/20 p-5  flex justify-center items-center gap-2 hover:text-yellow-300 font-semibold transition-colors duration-200"
            >
              <UserCheck2/>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-white cursor-pointer hover:bg-gray-400/20 p-5 flex justify-center items-center gap-2 hover:text-yellow-300 font-semibold transition-colors duration-200"
            >
              <LogOutIcon/>
              Logout
            </button>
          </div>
          }
        </div>
      </div>
    </nav>
  );
}
