import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut, Link } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CharacterLinkModal from '@/components/CharacterLinkModal';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
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
          <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-white/20 dark:hover:bg-[#1e293b]/50">
            <Avatar className="h-12 w-12 bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-[#38bdf8] dark:to-[#818cf8] border-2 border-white/30 dark:border-[#38bdf8]/30">
              <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-[#38bdf8] dark:to-[#818cf8] text-white font-bold">
                {getInitials(user.email || '')}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-white/30 dark:border-[#38bdf8]/30 shadow-2xl rounded-2xl p-2" align="end">
          <div className="flex items-center justify-start gap-3 p-3 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-[#1e1b4b]/40 dark:to-[#1e3a8a]/40 rounded-xl mb-2">
            <Avatar className="h-10 w-10 bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-[#38bdf8] dark:to-[#818cf8]">
              <AvatarFallback className="bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-[#38bdf8] dark:to-[#818cf8] text-white text-sm font-bold">
                {getInitials(user.email || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-semibold text-sm text-slate-700 dark:text-white">{user.email}</p>
              <p className="w-[180px] truncate text-xs text-slate-500 dark:text-slate-300">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-white/30 dark:bg-[#38bdf8]/20" />
          <DropdownMenuItem 
            className="cursor-pointer rounded-xl hover:bg-sky-50 dark:hover:bg-[#1e293b]/80 py-3 px-3"
            onClick={handleProfileClick}
          >
            <User className="mr-3 h-4 w-4 text-sky-600 dark:text-[#38bdf8]" />
            <span className="font-medium dark:text-white">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer rounded-xl hover:bg-emerald-50 dark:hover:bg-[#1e293b]/80 py-3 px-3"
            onClick={handleLinkCharacterClick}
          >
            <Link className="mr-3 h-4 w-4 text-emerald-600 dark:text-[#818cf8]" />
            <span className="font-medium dark:text-white">Link Character</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer rounded-xl hover:bg-green-50 dark:hover:bg-[#1e293b]/80 py-3 px-3"
            onClick={handleSettingsClick}
          >
            <Settings className="mr-3 h-4 w-4 text-green-600 dark:text-[#f59e0b]" />
            <span className="font-medium dark:text-white">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/30 dark:bg-[#38bdf8]/20" />
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
