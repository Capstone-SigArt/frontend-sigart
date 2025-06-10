
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
import { Settings, User, LogOut } from 'lucide-react';
import CharacterLinkModal from './CharacterLinkModal';

const ProfileDropdown = () => {
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  const handleSettings = () => {
    console.log('Opening settings...');
    // Add settings navigation logic here
  };

  const handleEditStudio = () => {
    console.log('Opening edit studio...');
    // Add edit studio logic here
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-12 w-12 rounded-full p-0">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-muted border-2 border-border">
                <User className="h-6 w-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
          <DropdownMenuItem 
            onClick={handleSettings}
            className="cursor-pointer hover:bg-gray-50"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setIsCharacterModalOpen(true)}
            className="cursor-pointer hover:bg-gray-50"
          >
            <User className="mr-2 h-4 w-4" />
            Link Character
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleEditStudio}
            className="cursor-pointer hover:bg-gray-50"
          >
            <Settings className="mr-2 h-4 w-4" />
            Edit Studio
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer hover:bg-gray-50 text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CharacterLinkModal 
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
      />
    </>
  );
};

export default ProfileDropdown;
