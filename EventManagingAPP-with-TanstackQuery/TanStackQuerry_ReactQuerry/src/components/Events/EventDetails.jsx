import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { fetchEvent, deleteEvent, queryClient } from "../../util/http.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { detail: id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: deleteEventPending,
    isError: deleteEventError,
    error: deleteEventErrorInfo,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  let content;

  function handleDeleteEvent() {
    setIsDeleting(true);
  }
  function startDeletion() {
    mutate({ id });
  }
  function stopDeletion() {
    setIsDeleting(false);
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={stopDeletion}>
          <h1>Are you sure?</h1>
          <p>Are you sure you want to delete htis event.</p>
          <div className="form-actions">
            {deleteEventPending && <p>deleting event...</p>}
            {!deleteEventPending && (
              <>
                <button onClick={stopDeletion} className="button-text">
                  Cancel
                </button>
                <button onClick={startDeletion} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {deleteEventError && (
            <ErrorBlock
              title="error deleting event"
              message={
                deleteEventErrorInfo.info?.message ||
                "could not delete the event"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <p>Loading Event Details...</p>}
      {isError && (
        <ErrorBlock
          title="error loading event details"
          message={error.info?.message || "Please try again later..."}
        />
      )}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleDeleteEvent}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data.dateTime}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
