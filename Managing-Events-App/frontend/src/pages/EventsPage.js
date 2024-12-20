import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  /*
if(data.isError){
return <p>{data.message}</p>}
  */
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //ONE WAY ===>  return{isError:true,message:"could not fetch events."};
    // ANOTHER WAY ===>  throw { message: "could not fetch events." };
    // ANOTHER WAY ===>  throw new Response(JSON.stringify({ message: "Could not fetch events." }), {      status: 500,    });

    //ANOTHER WAY
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
}
