import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '@/components/ProfileDropdown';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Schedule');
  const [currentMonth, setCurrentMonth] = useState('May');
  const [currentYear] = useState(2024);
  const navigate = useNavigate();

  const navigationTabs = [
    'Browse', 'Schedule', 'Create', 'My Parties', 'Showcase', 'My Studio', 'Resources'
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Browse') {
      navigate('/');
    } else if (tab === 'My Studio') {
      navigate('/studio');
    }
  };

  // Mock events data for the calendar
  const events = {
    1: [{ id: 'event-1', name: 'Event Name/Time' }],
    2: [{ id: 'event-2', name: 'Event Name/Time' }, { id: 'event-3', name: 'Event Name/Time' }],
    3: [{ id: 'event-4', name: 'Event Name/Time' }],
    8: [{ id: 'event-5', name: 'Event Name/Time' }, { id: 'event-6', name: 'Event Name/Time' }],
    9: [{ id: 'event-7', name: 'Event Name/Time' }],
    10: [{ id: 'event-8', name: 'Event Name/Time' }],
    15: [{ id: 'event-9', name: 'Event Name/Time' }],
    16: [{ id: 'event-10', name: 'Event Name/Time' }],
    17: [{ id: 'event-11', name: 'Event Name/Time' }, { id: 'event-12', name: 'Event Name/Time' }],
    22: [{ id: 'event-13', name: 'Event Name/Time' }],
    23: [{ id: 'event-14', name: 'Event Name/Time' }, { id: 'event-15', name: 'Event Name/Time' }, { id: 'event-16', name: 'Event Name/Time' }],
    24: [{ id: 'event-17', name: 'Event Name/Time' }],
    29: [{ id: 'event-18', name: 'Event Name/Time' }],
    30: [{ id: 'event-19', name: 'Event Name/Time' }],
    31: [{ id: 'event-20', name: 'Event Name/Time' }]
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  // Generate calendar days
  const generateCalendar = () => {
    const daysInMonth = 31; // May has 31 days
    const firstDayOfWeek = 3; // May 1st, 2024 starts on Wednesday (0=Sunday, 3=Wednesday)
    const calendar = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const calendarDays = generateCalendar();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    console.log('Previous month');
  };

  const handleNextMonth = () => {
    console.log('Next month');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
                <span className="text-sm font-medium text-muted-foreground">Logo</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">SigArt</h1>
            </div>
            
            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevMonth}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <h2 className="text-2xl font-bold text-foreground min-w-[120px] text-center">
                {currentMonth}
              </h2>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="ml-4"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Week Day Headers */}
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="h-12 flex items-center justify-center font-medium text-muted-foreground border border-border bg-muted/50"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="h-24 border border-border bg-background p-1 overflow-hidden"
                >
                  {day && (
                    <>
                      <div className="text-xs font-medium text-foreground mb-1">
                        {day}
                      </div>
                      <div className="space-y-1">
                        {events[day]?.map((event) => (
                          <div
                            key={event.id}
                            className="text-xs text-muted-foreground bg-muted/50 px-1 py-0.5 rounded truncate cursor-pointer hover:bg-muted transition-colors"
                            onClick={() => handleEventClick(event.id)}
                          >
                            {event.name}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
