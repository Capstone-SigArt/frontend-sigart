
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const conversations = [
    {
      id: 1,
      name: "Art Lovers Unite",
      type: "group",
      lastMessage: "Sarah: Just uploaded my latest digital piece!",
      timestamp: "2m ago",
      unread: 3,
      avatar: null,
      online: true
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      type: "direct",
      lastMessage: "Thanks for the feedback on my portfolio!",
      timestamp: "1h ago",
      unread: 1,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8b5?w=100&h=100&fit=crop&crop=face",
      online: true
    },
    {
      id: 3,
      name: "Digital Art Workshop",
      type: "group",
      lastMessage: "Alex: Meeting tomorrow at 3 PM",
      timestamp: "3h ago",
      unread: 0,
      avatar: null,
      online: false
    },
    {
      id: 4,
      name: "Jordan Kim",
      type: "direct",
      lastMessage: "Love your latest character design!",
      timestamp: "1d ago",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      online: false
    },
    {
      id: 5,
      name: "Fantasy Artists Collective",
      type: "group",
      lastMessage: "Weekly challenge: Mythical creatures",
      timestamp: "2d ago",
      unread: 0,
      avatar: null,
      online: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversationId: number) => {
    navigate(`/chat/${conversationId}`);
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <Button
          size="icon"
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground h-12"
        />
      </div>

      {/* Conversations */}
      <div className="space-y-3">
        {filteredConversations.map((conversation, index) => (
          <Card
            key={conversation.id}
            className="bg-card border-border hover:bg-muted/50 transition-all duration-300 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => handleConversationClick(conversation.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    {conversation.avatar ? (
                      <AvatarImage src={conversation.avatar} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white">
                      {conversation.type === 'group' ? '🎨' : conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && conversation.type === 'direct' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-card"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-card-foreground truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {conversation.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                          {conversation.unread}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredConversations.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-semibold mb-2">No conversations found</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Try searching with different keywords
          </p>
        </div>
      )}

      {/* No Conversations State */}
      {conversations.length === 0 && !searchQuery && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-semibold mb-2">No conversations yet</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Connect with other artists and start chatting!
          </p>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
            Start a Conversation
          </Button>
        </div>
      )}
    </div>
  );
};

export default Messages;
