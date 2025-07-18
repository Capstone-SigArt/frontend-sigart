
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
    if (characterName) {
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
      <DialogContent className="max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/30 shadow-2xl rounded-2xl z-[10000]">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
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
            {/*<Input
              placeholder="Datacenter/Server"
              value={datacenter}
              onChange={(e) => setDatacenter(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-700/60 border-sky-200 dark:border-sky-600 rounded-xl backdrop-blur-sm"
            />*/}
            <Button 
              onClick={handleSearch}
              type="button"
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl shadow-lg"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            {searchResults.length > 0 && (
                <div className="mt-4 max-h-40 overflow-y-auto border border-slate-300 rounded p-2 bg-white/90 dark:bg-slate-700/80">
                  <h4 className="text-sm font-semibold mb-2">Search Results</h4>
                  {searchResults.map((char, index) => (
                      <div
                          key={index}
                          className={`p-2 cursor-pointer rounded flex items-center justify-between
    ${selectedCharacter?.ID === char.ID
                              ? 'bg-sky-300 dark:bg-sky-600'
                              : 'hover:bg-sky-200 dark:hover:bg-sky-700'}`}
                          onClick={() => {
                            setSelectedCharacter(char);
                            setCharacterName(char.Name);
                          }}
                      >
                        <div>
                          <div className="font-medium">{char.Name}</div>
                          <div className="text-xs text-muted-foreground">ID: {char.ID}</div>
                          <div className="text-xs text-muted-foreground">World: {char.World}</div>
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
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl border border-sky-200 dark:border-sky-600">
                <div className="flex items-center space-x-3">
                  <img
                      src={character.avatar}
                      alt={`${character.name} avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                  />
                  {/*<div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Plus className="text-white text-sm" />
                  </div>*/}
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{character.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
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
            disabled={!characterName}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Link Character
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterLinkModal;
