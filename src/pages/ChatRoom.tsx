
import React, { useState } from 'react';
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useParams } from 'react-router-dom';

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');

  // Mock chat data
  const chatInfo = {
    id: id || '1',
    name: "Art Lovers Unite",
    type: "group",
    members: 24,
    avatar: null
  };

  const messages = [
    {
      id: 1,
      sender: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8b5?w=100&h=100&fit=crop&crop=face",
      message: "Just uploaded my latest digital piece! Check it out 🎨",
      timestamp: "2:30 PM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      avatar: null,
      message: "That looks amazing! Love the color palette",
      timestamp: "2:32 PM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Maya Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      message: "Thanks for the feedback on my portfolio everyone! 💙",
      timestamp: "2:45 PM",
      isOwn: false
    },
    {
      id: 4,
      sender: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      message: "Weekly challenge: Mythical creatures! Who's in?",
      timestamp: "3:00 PM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Avatar className="w-10 h-10">
            {chatInfo.avatar ? (
              <AvatarImage src={chatInfo.avatar} />
            ) : null}
            <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white">
              🎨
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">{chatInfo.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chatInfo.type === 'group' ? `${chatInfo.members} members` : 'Online'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs space-x-2 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {!msg.isOwn && (
                <Avatar className="w-8 h-8">
                  {msg.avatar ? (
                    <AvatarImage src={msg.avatar} />
                  ) : null}
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {msg.sender.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                {!msg.isOwn && (
                  <p className="text-xs text-muted-foreground mb-1">{msg.sender}</p>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    msg.isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-muted border-border"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button variant="ghost" size="icon">
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
