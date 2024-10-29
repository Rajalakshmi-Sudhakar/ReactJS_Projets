import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

export default function EditEventsPage() {
  const data = useRouteLoaderData("event-detail");
  return <EventForm event={data.event} method="PATCH" />;
}