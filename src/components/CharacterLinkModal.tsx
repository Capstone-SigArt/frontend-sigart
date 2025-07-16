
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Search, Plus } from 'lucide-react';
import axios from 'axios';
import { supabase } from '@/lib/supabase';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL
interface CharacterLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CharacterLinkModal = ({ isOpen, onClose }: CharacterLinkModalProps) => {
  const [characterName, setCharacterName] = useState('');
  const [datacenter, setDatacenter] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
/*  const [linkedCharacters, setLinkedCharacters] = useState([
    /!*{ name: 'Character 1', datacenter: 'Aether', server: 'Gilgamesh' },
    { name: 'Character 2', datacenter: 'Crystal', server: 'Balmung' },
    { name: 'Character 3', datacenter: 'Primal', server: 'Leviathan' }*!/
  ]);*/
  const[linkedCharacters, setLinkedCharacters] = useState([]);

  useEffect(() => {
    const fetchLinkedCharacters = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        try {
          console.log("This is the get route for user id " + user.id);
          const response = await axios.get(`${API_BASE_URL}/linkCharacters/${user.id}`);
          setLinkedCharacters(response.data);
        } catch (err) {
          console.error('Failed to fetch linked characters:', err);
        }
      }
    };

    if (isOpen) {
      fetchLinkedCharacters();
    }
  }, [isOpen]);


  const handleSearch = async() => {
    try {
      console.log('Searching for character:', characterName, 'on', datacenter);
      const response = await axios.get(`${API_BASE_URL}/api/characters`, {
        params: {
          name: characterName
        }
      });
      const characters = response.data;
      console.log('Search results:', characters);
      setSearchResults(characters);

    } catch (error) {
      console.error('Error fetching character data:', error);
      setSearchResults([]);
    }

  };

  const handleLinkCharacter = async() => {
    if(!selectedCharacter)
    {
      alert("Please select a character first");
      return;
    }
    if (characterName && datacenter) {
      setLinkedCharacters([...linkedCharacters, { 
        name: characterName, 
        datacenter: datacenter, 
        server: 'Server'

      }]);
      try{
      const {
        data: {user},
      } = await supabase.auth.getUser();
      console.log(user.id);
        console.log({
          character_id: String(selectedCharacter.ID),
          name: selectedCharacter.Name,
          avatar: selectedCharacter.Avatar,
          user_id: user.id,
        });
        const response = await axios.post(`${API_BASE_URL}/linkCharacters`, {
          character_id: selectedCharacter.ID,
          name: selectedCharacter.Name,
          avatar: selectedCharacter.Avatar,
          user_id: user.id
        });
      } catch (err) {
        console.error("Failed to link character")
      }
      setCharacterName('');
      setDatacenter('');
      setSelectedCharacter(null);
    }
  };

  /*const removeCharacter = (index: number) => {
    setLinkedCharacters(linkedCharacters.filter((_, i) => i !== index));
  };*/
  const removeCharacter = async (characterId: string, userId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/linkCharacters/${characterId}/${userId}`);
      setLinkedCharacters(prev =>
          prev.filter(char => char.character_id !== characterId)
      );
    } catch (err) {
      console.error("Failed to delete character:", err);
      alert("Failed to remove character.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-white/30 dark:border-[#38bdf8]/30 shadow-2xl rounded-2xl z-[10000]">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-[#38bdf8] dark:to-[#f59e0b] bg-clip-text text-transparent">
              Link your FFXIV Character
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground dark:text-slate-300">
            Search for and link your Final Fantasy XIV characters to your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="Character Name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full bg-white/60 dark:bg-[#1e293b]/60 border-sky-200 dark:border-[#38bdf8]/30 rounded-xl backdrop-blur-sm"
            />
            <Input
              placeholder="Datacenter/Server"
              value={datacenter}
              onChange={(e) => setDatacenter(e.target.value)}
              className="w-full bg-white/60 dark:bg-[#1e293b]/60 border-sky-200 dark:border-[#38bdf8]/30 rounded-xl backdrop-blur-sm"
            />
            <Button 
              onClick={handleSearch}
              type="button"
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 dark:from-[#1e3a8a] dark:to-[#1e1b4b] dark:hover:from-[#1e3a8a]/90 dark:hover:to-[#1e1b4b]/90 text-white rounded-xl shadow-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            {searchResults.length > 0 && (
                <div className="mt-4 max-h-40 overflow-y-auto border border-slate-300 dark:border-[#38bdf8]/30 rounded p-2 bg-white/90 dark:bg-[#1e293b]/80">
                  <h4 className="text-sm font-semibold mb-2 dark:text-white">Search Results</h4>
                  {searchResults.map((char, index) => (
                      <div
                          key={index}
                          className="p-2 hover:bg-sky-200 dark:hover:bg-[#1e293b] cursor-pointer rounded flex items-center justify-between"
                          onClick={() => {
                            setSelectedCharacter(char)
                            setCharacterName(char.Name);
                            setDatacenter(datacenter);
                          }}
                      >
                        <div>
                          <div className="font-medium dark:text-white">{char.Name}</div>
                          <div className="text-xs text-muted-foreground dark:text-slate-300">ID: {char.ID}</div>
                          <div className="text-xs text-muted-foreground dark:text-slate-300">World: {char.World}</div>
                        </div>
                        <img
                            src={char.Avatar || char.avatar}
                            alt={`${char.Name} avatar`}
                            className="w-12 h-12 rounded-full object-cover ml-4"
                        />
                      </div>
                  ))}
                </div>
            )}
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {linkedCharacters.map((character, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-[#1e1b4b]/40 dark:to-[#1e3a8a]/40 rounded-xl border border-sky-200 dark:border-[#38bdf8]/30">
                <div className="flex items-center space-x-3">
                  <img
                      src={character.avatar}
                      alt={`${character.name} avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-white">{character.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs bg-sky-100 dark:bg-[#1e293b]/80 text-sky-700 dark:text-[#38bdf8]">
                      {character.character_id}
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
                    removeCharacter(character.character_id, character.user_id);
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
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 dark:from-[#38bdf8] dark:to-[#818cf8] dark:hover:from-[#38bdf8]/90 dark:hover:to-[#818cf8]/90 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Link Character
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterLinkModal;
