
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Search, Plus } from 'lucide-react';

interface CharacterLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CharacterLinkModal = ({ isOpen, onClose }: CharacterLinkModalProps) => {
  const [characterName, setCharacterName] = useState('');
  const [datacenter, setDatacenter] = useState('');
  const [linkedCharacters, setLinkedCharacters] = useState([
    { name: 'Character 1', datacenter: 'Aether', server: 'Gilgamesh' },
    { name: 'Character 2', datacenter: 'Crystal', server: 'Balmung' },
    { name: 'Character 3', datacenter: 'Primal', server: 'Leviathan' }
  ]);

  const handleSearch = () => {
    console.log('Searching for character:', characterName, 'on', datacenter);
  };

  const handleLinkCharacter = () => {
    if (characterName && datacenter) {
      setLinkedCharacters([...linkedCharacters, { 
        name: characterName, 
        datacenter: datacenter, 
        server: 'Server' 
      }]);
      setCharacterName('');
      setDatacenter('');
    }
  };

  const removeCharacter = (index: number) => {
    setLinkedCharacters(linkedCharacters.filter((_, i) => i !== index));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl z-[10000]">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Link your FFXIV Character
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Search for and link your Final Fantasy XIV characters to your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="Character Name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
            />
            <Input
              placeholder="Datacenter/Server"
              value={datacenter}
              onChange={(e) => setDatacenter(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
            />
            <Button 
              onClick={handleSearch}
              type="button"
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl shadow-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {linkedCharacters.map((character, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl border border-sky-200 dark:border-sky-600">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Plus className="text-white text-sm" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{character.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
                      {character.datacenter}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeCharacter(index);
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                >
                  <X className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleLinkCharacter}
            type="button"
            disabled={!characterName || !datacenter}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Link Character
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterLinkModal;
