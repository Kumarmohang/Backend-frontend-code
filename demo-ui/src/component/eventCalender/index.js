/* eslint-disable react-hooks/exhaustive-deps */
import "../results/results.scss";
import "./eventCalender.scss";
// import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "../Dropdown";
import Loader from "../loader";
import apiCall, { getEventCalenderReset, getEventYearsReset } from "./logic";

const EventList = ({ eventList = [], id }) => {
  const renderList = () =>
    eventList.map((ele, index) => (
      <li key={`${id}_${index}`}>
        <span className="event-text">{ele.event_text}</span> :{" "}
        <span className="event-date">
          {ele.event_key ? (
            <Link
              to={{
                pathname: "/details",
                search: new URLSearchParams({
                  eventKey: ele.event_key,
                  type: "events",
                }).toString(),
              }}
              className="link"
            >
              {ele.event_date}
            </Link>
          ) : (
            ele.event_date
          )}
        </span>
      </li>
    ));
  return <ul className="events">{renderList()}</ul>;
};

const EventsCalender = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeDropdownElement, setActiveDropdownElement] = useState({
    display: new Date().getFullYear(),
    value: new Date().getFullYear(),
  });

  const { loading: eventCalenderLoading, data: eventCalender } = useSelector(
    (state) => state.eventCalender
  );
  const { data: eventYears } = useSelector((state) => state.eventYears);

  useEffect(() => {
    dispatch(apiCall.getEventYears());
    dispatch(apiCall.getEventCalender());
    return () => {
      dispatch(getEventCalenderReset());
      dispatch(getEventYearsReset());
    };
  }, []);

  useEffect(() => {
    const query = {
      year: activeDropdownElement.value,
    };
    history.replace(`/events/?${new URLSearchParams(query).toString()}`);
    dispatch(
      apiCall.getEventCalender(`${new URLSearchParams(query).toString()}`)
    );
  }, [activeDropdownElement]);

  const onDropdownChange = (ele) => {
    setActiveDropdownElement(ele);
  };

  const renderCalender = () => {
    return (eventCalender || []).map((ele) => {
      return (
        <tr key={ele.id}>
          <td className="year-col">{`${ele.month} ${ele.year}`}</td>
          <td className="event-col">
            <EventList eventList={ele.events} />
          </td>
        </tr>
      );
    });
  };
  // useEffect(, [])
  return (
    <div className="result calender">
      <header className="result-for">
        <span className="heading-text">Event Calender</span>
      </header>
      <div className="result-sections">
        <section className="filter-section">
          <span className="label">Year:</span>
          <Dropdown
            options={eventYears || []}
            onChange={onDropdownChange}
            active={activeDropdownElement}
          />
        </section>
      </div>
      <div className="result-sections">
        <section
          className="result-items calender-section"
          style={{ width: "90%" }}
        >
          <div className="result-items-container">
            <Loader
              isLoading={eventCalenderLoading}
              height={500}
              noData={!eventCalender?.length}
            >
              <table className="event-calender">
                <tbody>{renderCalender()}</tbody>
              </table>
            </Loader>
          </div>
        </section>
      </div>
    </div>
  );
};
export default EventsCalender;
