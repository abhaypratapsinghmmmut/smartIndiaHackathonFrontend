import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar } from 'lucide-react';

const CulturalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // --- Your events object here (same as before) ---
  const events = {
  '2025-09-11': {
    title: 'Pang Lhabsol Festival',
    location: 'Pemayangtse Monastery',
    time: '10:00 AM - 5:00 PM',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    description: 'This sacred celebration honors the guardian deity of Sikkim with traditional mask dances, rituals, and cultural performances.',
    type: 'festival'
  },
  '2025-09-15': {
    title: 'Buddha Purnima Celebration',
    location: 'Rumtek Monastery',
    time: '6:00 AM - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1604608672516-f1a1c0db7f63?auto=format&fit=crop&w=1000&q=80',
    description: 'Commemorating the birth, enlightenment, and death of Buddha with butter lamps and prayers.',
    type: 'ritual'
  },
  '2025-12-05': {
    title: 'Kagyed Dance Festival',
    location: 'Phodong Monastery',
    time: '10:00 AM - 5:00 PM',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    description: 'Colorful Cham mask dances to drive away evil spirits and welcome peace.',
    type: 'festival'
  },
  '2026-01-25': {
    title: 'Losar - Tibetan New Year',
    location: 'Rumtek Monastery',
    time: '6:00 AM - 6:00 PM',
    image: 'https://images.unsplash.com/photo-1579762596422-41e8a0bcb9b7?auto=format&fit=crop&w=1000&q=80',
    description: 'Celebrate Tibetan New Year with rituals, offerings, and prayers for prosperity.',
    type: 'festival'
  },
  '2026-03-10': {
    title: 'Saga Dawa Festival',
    location: 'Lingdum Monastery',
    time: '5:00 AM - 9:00 PM',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=1000&q=80',
    description: 'Marks the birth, enlightenment, and death of Lord Buddha. Pilgrims light lamps and monks perform rituals.',
    type: 'ritual'
  },
  '2026-07-18': {
    title: 'Rainy Season Retreat - Meditation Camp',
    location: 'Ralang Monastery',
    time: '8:00 AM - 3:00 PM',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    description: 'A monsoon meditation retreat with guided sessions and Buddhist teachings.',
    type: 'workshop'
  },
  '2026-11-02': {
    title: 'Lhabab Düchen',
    location: 'Tashiding Monastery',
    time: '6:00 AM - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1531189091559-65a8447aa74f?auto=format&fit=crop&w=1000&q=80',
    description: 'Commemorates Buddha’s descent from heaven with butter lamp offerings and rituals.',
    type: 'ritual'
  },
  '2027-02-08': {
    title: 'Cham Mask Dance',
    location: 'Pemayangtse Monastery',
    time: '9:00 AM - 5:00 PM',
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=1000&q=80',
    description: 'Elaborate Cham dances symbolizing the triumph of good over evil.',
    type: 'festival'
  },
  '2027-05-22': {
    title: 'Butter Lamp Lighting Ceremony',
    location: 'Rumtek Monastery',
    time: '6:00 PM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1570625555084-ec0ce5f79913?auto=format&fit=crop&w=1000&q=80',
    description: 'An evening ritual where thousands of butter lamps are lit for peace and harmony.',
    type: 'ritual'
  },
  '2027-08-14': {
    title: 'Monastic Art & Culture Workshop',
    location: 'Enchey Monastery',
    time: '10:00 AM - 4:00 PM',
    image: 'https://images.unsplash.com/photo-1583406361635-c19f1f02b2da?auto=format&fit=crop&w=1000&q=80',
    description: 'Learn Thangka painting, butter sculpture, and sand mandala art from monks and artisans.',
    type: 'workshop'
  }
};


  const getEventTypeColor = (type) => {
    switch (type) {
      case 'festival': return 'bg-red-600';
      case 'ritual': return 'bg-orange-500';
      case 'workshop': return 'bg-blue-500';
      case 'special': return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const selectDate = (day) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(day);
    if (events[dateKey]) {
      setSelectedEvent(events[dateKey]);
    } else {
      setSelectedEvent(null);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasEvent = events[dateKey];
      const isSelected = selectedDate === day;

      days.push(
        <div
          key={day}
          onClick={() => selectDate(day)}
          className={`h-12 flex items-center justify-center cursor-pointer relative transition-all duration-200 hover:bg-slate-700/50 rounded-lg ${
            isSelected ? 'bg-orange-500 text-white' : 'text-slate-300'
          }`}
        >
          <span className="text-sm font-medium">{day}</span>
          {hasEvent && (
            <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${getEventTypeColor(hasEvent.type)}`}></div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // --- NEW: Filter events for current month ---
  const currentMonthEvents = Object.entries(events).filter(([date]) => {
    const d = new Date(date);
    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Sacred Sikkim</h1>
          </div>
          <h2 className="text-2xl text-slate-300 mb-2">Cultural Calendar</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Embark on an immersive journey through ancient monasteries and vibrant culture of Sikkim. 
            Explore sacred festivals, meditation workshops, and spiritual celebrations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-slate-300" />
                </button>
                <h3 className="text-xl font-semibold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-xs">
                <div className="flex items-center"><div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div><span className="text-slate-300">Festivals</span></div>
                <div className="flex items-center"><div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div><span className="text-slate-300">Rituals</span></div>
                <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div><span className="text-slate-300">Workshops</span></div>
                <div className="flex items-center"><div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div><span className="text-slate-300">Special Events</span></div>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 mb-4">
                {weekDays.map(day => (
                  <div key={day} className="h-10 flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-400">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
            </div>

            {/* --- NEW - Event Cards --- */}
            {currentMonthEvents.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Events in {monthNames[currentDate.getMonth()]}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentMonthEvents.map(([date, event]) => (
                    <div key={date} className="bg-slate-800/70 border border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition-transform">
                      <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
                        <p className="text-slate-400 text-sm mb-3">{event.location}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs text-white ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                          <span className="text-slate-400 text-xs">{date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Event Details Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 top-8">
              {selectedEvent ? (
                <div>
                  <div className="mb-6">
                    <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-48 object-cover rounded-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{selectedEvent.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-300"><MapPin className="w-4 h-4 mr-2 text-orange-500" /><span className="text-sm">{selectedEvent.location}</span></div>
                    <div className="flex items-center text-slate-300"><Clock className="w-4 h-4 mr-2 text-orange-500" /><span className="text-sm">{selectedEvent.time}</span></div>
                    <div className="flex items-center justify-end"><span className={`px-3 py-1 rounded-full text-xs text-white ${getEventTypeColor(selectedEvent.type)}`}>{selectedEvent.type}</span></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedEvent.description}</p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
                   <Link to="/booking">Book Experience</Link> 
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-400 mb-2">Select a Date</h3>
                  <p className="text-slate-500 text-sm">Click on any highlighted date to view event details and book your spiritual journey.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalCalendar;
