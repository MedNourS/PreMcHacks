import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'


function Dashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function getEvent() {
            const res = await fetch("http://localhost:3000/events", {
                credentials: "include"
            });
            if(!res.ok){
                return false;
            }

            const events = await res.json();
            return events;
        }

        getEvent()
          .then(data => {
            setEvents(data);
            console.log(data);
        })
    }, []);

    return (
        <>
          <div className="h-16 flex justify-between items-center bg-neutral-900 border-b-2 border-neutral-100/20">
            <div className="flex">
              <h1 className="ml-12 mr-20 font-Domine underline text-4xl text-neutral-100">TimeFrame</h1>
              <button className="p-2 mr-6 font-Sans text-lg text-neutral-100 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 transition hover:from-blue-400 hover:to-blue-500">Add</button>
              <button className="p-2 font-Sans text-lg text-neutral-100 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 transition hover:from-blue-400 hover:to-blue-500">Remove</button>
            </div>
            <div>
              <button className="p-2 ml-6 font-Sans text-lg text-blue-300 rounded-lg transition hover:bg-neutral-800">Sign out</button>
              <button className="p-2 ml-6 mr-12 w-fit font-Sans text-lg text-blue-300 rounded-lg transition hover:bg-neutral-800">Français</button>
            </div>
          </div>
          <FullCalendar 
            plugins={[timeGridPlugin, dayGridPlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
          />
        </>
    );
}

export default Dashboard