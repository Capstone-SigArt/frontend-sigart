import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModernNavigation from '@/components/ModernNavigation';
import { useAuth } from '@/contexts/AuthContext';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Schedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [events, setEvents] = useState<Record<number, any[]>>({});
  const [loading, setLoading] = useState(true);

  const currentMonthName = monthNames[currentMonthIndex];

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/parties`);
        const data = await response.json();
        setAllEvents(data);
        console.log("Fetched events:", data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);  

  useEffect(() => {
    // Only filter if we have events to filter
    if (allEvents.length === 0) return;
    
    const filtered = allEvents.filter((event: any) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === currentMonthIndex &&
        eventDate.getFullYear() === currentYear
      );
    });

    const grouped: Record<number, any[]> = {};
    filtered.forEach((event: any) => {
      const day = new Date(event.date).getDate();
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(event);
    });

    setEvents(grouped);
  }, [allEvents, currentMonthIndex, currentYear]);

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handlePrevMonth = () => {
    setEvents({}); // Clear events immediately
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setEvents({}); // Clear events immediately
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const calendar = [];

    for (let i = 0; i < firstDay; i++) calendar.push(null);
    for (let day = 1; day <= daysInMonth; day++) calendar.push(day);

    return calendar;
  };

  const calendarDays = generateCalendar();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-green-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10">
      <ModernNavigation 
        title="Schedule" 
        subtitle="View and manage your art events"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="mr-6 bg-white/40 hover:bg-white/60 rounded-full"
                onClick={handlePrevMonth}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent min-w-[150px] text-center">
                {loading ? 'Loading...' : `${currentMonthName} ${currentYear}`}
              </h2>

              <Button
                variant="ghost"
                size="icon"
                className="ml-6 bg-white/40 hover:bg-white/60 rounded-full"
                onClick={handleNextMonth}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 rounded-xl overflow-hidden transition-opacity duration-300 ease-in-out" 
                 style={{ opacity: loading ? 0 : 1 }}
                 key={`${currentMonthIndex}-${currentYear}`}>
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="h-14 flex items-center justify-center font-semibold text-slate-700 dark:text-slate-300 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-800 dark:to-blue-800"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="h-28 bg-white/60 dark:bg-slate-700/60 border border-white/30 p-2 overflow-hidden hover:bg-white/80 transition-all"
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
                            className="text-xs text-white bg-gradient-to-r from-sky-500 to-blue-500 px-2 py-1 rounded-md truncate cursor-pointer hover:from-sky-600 hover:to-blue-600 transition-all shadow-sm"
                            onClick={() => handleEventClick(event.id)}
                          >
                            {event.title}
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
