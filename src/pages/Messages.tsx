
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MessageSquare } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Sarah Chen',
    lastMessage: 'Thanks for joining the art showcase!',
    time: '2m ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    online: true
  },
  {
    id: 2,
    name: 'Art Community',
    lastMessage: 'New workshop announced for next week',
    time: '1h ago',
    unread: 0,
    avatar: null,
    online: false,
    isGroup: true
  },
  {
    id: 3,
    name: 'Mike Johnson',
    lastMessage: 'Love your latest digital painting!',
    time: '3h ago',
    unread: 1,
    avatar: null,
    online: false
  },
  {
    id: 4,
    name: 'Digital Artists Hub',
    lastMessage: 'Welcome to the community!',
    time: '1d ago',
    unread: 0,
    avatar: null,
    online: false,
    isGroup: true
  }
];

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {filteredConversations.map((conversation) => (
          <Card 
            key={conversation.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/app/messages/${conversation.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>
                      {conversation.isGroup ? (
                        <MessageSquare className="w-6 h-6" />
                      ) : (
                        conversation.name.split(' ').map(n => n[0]).join('')
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      {conversation.unread > 0 && (
                        <Badge className="bg-blue-500 text-white px-2 py-1 text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConversations.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No conversations found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try a different search term' : 'Start a conversation with someone'}
          </p>
          <Button>Start New Conversation</Button>
        </div>
      )}
    </div>
  );
}
