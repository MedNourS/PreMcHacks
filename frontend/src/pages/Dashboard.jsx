import { useEffect, useState } from 'react';

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
            <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard