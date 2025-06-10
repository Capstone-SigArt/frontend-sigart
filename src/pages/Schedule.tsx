
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState('May');
  const [currentYear] = useState(2024);
  const navigate = useNavigate();

  // Mock events data for the calendar
  const events = {
    1: [{ id: 'event-1', name: 'Digital Art Workshop' }],
    2: [{ id: 'event-2', name: 'Portrait Class' }, { id: 'event-3', name: 'Abstract Night' }],
    3: [{ id: 'event-4', name: 'Plein Air Session' }],
    8: [{ id: 'event-5', name: 'Mixed Media' }, { id: 'event-6', name: 'Street Art Tour' }],
    9: [{ id: 'event-7', name: 'Watercolor Class' }],
    10: [{ id: 'event-8', name: 'Community Show' }],
    15: [{ id: 'event-9', name: 'Digital Workshop' }],
    16: [{ id: 'event-10', name: 'Art Fair Prep' }],
    17: [{ id: 'event-11', name: 'Portrait Session' }, { id: 'event-12', name: 'Group Critique' }],
    22: [{ id: 'event-13', name: 'Gallery Opening' }],
    23: [{ id: 'event-14', name: 'Art Jam' }, { id: 'event-15', name: 'Workshop' }, { id: 'event-16', name: 'Exhibition' }],
    24: [{ id: 'event-17', name: 'Studio Visit' }],
    29: [{ id: 'event-18', name: 'Art Market' }],
    30: [{ id: 'event-19', name: 'Open Studio' }],
    31: [{ id: 'event-20', name: 'Final Show' }]
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-green-100 dark:from-sky-900 dark:via-emerald-900 dark:to-green-900">
      <ModernNavigation 
        title="Schedule" 
        subtitle="View and manage your art events"
      />

      {/* Calendar Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevMonth}
                className="mr-6 bg-white/40 hover:bg-white/60 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent min-w-[150px] text-center">
                {currentMonth} {currentYear}
              </h2>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="ml-6 bg-white/40 hover:bg-white/60 rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 rounded-xl overflow-hidden">
              {/* Week Day Headers */}
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="h-14 flex items-center justify-center font-semibold text-slate-700 dark:text-slate-300 bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-800 dark:to-emerald-800"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="h-28 bg-white/60 dark:bg-slate-700/60 border border-white/30 p-2 overflow-hidden hover:bg-white/80 transition-colors"
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {day}
                      </div>
                      <div className="space-y-1">
                        {events[day]?.map((event) => (
                          <div
                            key={event.id}
                            className="text-xs text-white bg-gradient-to-r from-sky-500 to-emerald-500 px-2 py-1 rounded-md truncate cursor-pointer hover:from-sky-600 hover:to-emerald-600 transition-all shadow-sm"
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
