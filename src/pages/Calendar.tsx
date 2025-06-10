
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Digital Art Showcase",
      date: "Dec 15",
      time: "7:00 PM",
      status: "attending"
    },
    {
      id: 2,
      title: "Character Design Workshop",
      date: "Dec 18",
      time: "3:00 PM",
      status: "rsvp"
    },
    {
      id: 3,
      title: "Fantasy Art Convention",
      date: "Dec 20",
      time: "10:00 AM",
      status: "interested"
    }
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="px-4 py-6 max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <Button
          onClick={() => navigate('/create')}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      {/* Calendar Header */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-card-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-center p-2 text-sm ${
                  day ? 'text-card-foreground hover:bg-muted rounded cursor-pointer' : ''
                } ${day === 15 || day === 18 || day === 20 ? 'bg-primary/10 text-primary font-semibold' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-card-foreground font-medium">{event.title}</p>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.date} at {event.time}
                    </div>
                  </div>
                </div>
                <Badge variant={event.status === 'attending' ? 'default' : 'outline'}>
                  {event.status === 'attending' ? 'Attending' : 'RSVP'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
