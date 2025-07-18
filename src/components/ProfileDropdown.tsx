import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { User, Settings, LogOut, Link } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CharacterLinkModal from '@/components/CharacterLinkModal';
import { useProfile } from '@/hooks/useProfile';



const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const {profile} = useProfile();
  const navigate = useNavigate();
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  if (!user) {
    return null;
  }

  const getInitials = (name?: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleProfileClick = () => {
    navigate('/user-studio');
  };

  const handleSettingsClick = () => {
    // For now, navigate to user studio as settings page
    navigate('/user-studio');
  };

  const handleLinkCharacterClick = () => {
    setShowCharacterModal(true);
  };



  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-white/20 dark:hover:bg-slate-700/20">

            <Avatar className="h-12 w-12 bg-gradient-to-r from-sky-500 to-emerald-500 border-2 border-white/30">
              {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt="User avatar" />
              ) : (
                  <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold">
                    {getInitials(user.email || '')}
                  </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl p-2" align="end">
          <div className="flex items-center justify-start gap-3 p-3 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl mb-2">
            <Avatar className="h-10 w-10 bg-gradient-to-r from-sky-500 to-blue-500">
              <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-bold">
                {getInitials(user.email || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">{user.email}</p>
              <p className="w-[180px] truncate text-xs text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-white/30" />
          <DropdownMenuItem 
            className="cursor-pointer rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/30 py-3 px-3"
            onClick={handleProfileClick}
          >
            <User className="mr-3 h-4 w-4 text-sky-600" />
            <span className="font-medium">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 py-3 px-3"
            onClick={handleLinkCharacterClick}
          >
            <Link className="mr-3 h-4 w-4 text-blue-600" />
            <span className="font-medium">Link Character</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer rounded-xl hover:bg-green-50 dark:hover:bg-green-900/30 py-3 px-3"
            onClick={handleSettingsClick}
          >
            <Settings className="mr-3 h-4 w-4 text-green-600" />
            <span className="font-medium">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/30" />
          <DropdownMenuItem 
            className="cursor-pointer text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 py-3 px-3"
            onClick={logout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CharacterLinkModal
        isOpen={showCharacterModal}
        onClose={() => setShowCharacterModal(false)}
      />
    </>
  );
};

export default ProfileDropdown;
