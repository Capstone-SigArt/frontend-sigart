
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Link your FFXIV Character</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="Character Name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Datacenter/Server"
              value={datacenter}
              onChange={(e) => setDatacenter(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={handleSearch}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="space-y-2">
            {linkedCharacters.map((character, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">+</span>
                  </div>
                  <span className="text-sm">{character.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {character.datacenter}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCharacter(index)}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleLinkCharacter}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Link Character
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterLinkModal;
