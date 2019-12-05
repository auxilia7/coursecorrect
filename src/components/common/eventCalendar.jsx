import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

class EventCalendar extends Component {
  render() {
    const { events, defaultDate } = this.props;
    console.log("Event calendar", events);
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          date={defaultDate}
          defaultView="week"
          events={events}
          style={{ height: "70vh", marginBottom: 40 }}
        />
      </div>
    );
  }
}

export default EventCalendar;
