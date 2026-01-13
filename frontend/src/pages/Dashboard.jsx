import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

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
          <FullCalendar 
            plugins={[timeGridPlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
          />
        </>
    );
}

export default Dashboard