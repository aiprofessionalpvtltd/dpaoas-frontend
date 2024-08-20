import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import './calendar.css';

export const Calendar = () => {
  const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Conference', start: new Date('2023-11-10T10:00:00') },
    { title: 'Presentation', start: '2023-11-20' },
  ];

  // A custom render function for event content
  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <b>{eventInfo.timeText}</b>
        <p>{eventInfo.event.title}</p>
      </div>
    );
  };

  // Header customization with view filters
  const headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  };

  return (
    <div>
      {/* <h1>Full Calendar</h1> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        eventDisplay="block"
        headerToolbar={headerToolbar}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // Show AM/PM
        }}
        height={430}
        themeSystem="cosmo"
      />
    </div>
  );
};