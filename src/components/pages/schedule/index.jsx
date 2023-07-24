import { useEffect, useState } from "react";

import { useMachine } from "@xstate/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import ToggleButton from "@mui/material/Button";

import TodayIcon from "@mui/icons-material/Today";
import automataMachine from "@/machines";
import {
  addInitialDates,
  allocatedTimeButtons,
  allocatedWeekButtons,
} from "@/helpers";
import Calendar from "@components/organisms/calendar";

import "./index.scss";

const PersonalSchedule = () => {
  const [state, send] = useMachine(automataMachine);
  const [calendar, setCalendar] = useState(false);

  const { dates, timeAllocated, weekOrDayAllocated } = state.context;

  useEffect(() => {
    send("SCHEDULE");

    let printedDates = addInitialDates();
    send({
      type: "ADD_INITIAL_DATES",
      payload: printedDates,
    });
  }, []);

  const toggleCalendar = () => setCalendar(!calendar);

  const onAllocateTime = (time) => {
    send({
      type: "SET_TIME_ALLOCATED",
      payload: time,
    });
  };

  const onWeekOrDayAllocated = (weekOrDay) => {
    send({
      type: "SET_WEEK_DAY_ALLOCATION",
      payload: weekOrDay,
    });
  };

  const buttonStyle = {
    borderColor: "#EBEBEE",
    borderRadius: "10px",
    color: "#42474E",
  };

  return (
    <Box
      sx={{
        width: "900px",
        padding: "90px 75px",
        borderRadius: "15px",
        bgcolor: "#fff",
        boxSizing: "border-box",
        boxShadow: 2,
        margin: "0 auto",
      }}>
      <div className="row-item">
        {console.log(state)}
        <Stack spacing={2} direction="row" sx={{ marginBottom: "15px" }}>
          <h3>Duration</h3>

          {allocatedTimeButtons.map((button) => (
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => {
                onAllocateTime(button.value);
              }}
              selected={button.value === timeAllocated}
              key={button.value}>
              {button.label}
            </Button>
          ))}
        </Stack>
      </div>
      <div className="row-item">
        <Stack spacing={2} direction="row" sx={{ marginBottom: "15px" }}>
          <h3>Planned</h3>
          {allocatedWeekButtons.map((button) => (
            <Button
              variant="outlined"
              sx={buttonStyle}
              selected={button.value === weekOrDayAllocated}
              onClick={() => {
                onWeekOrDayAllocated(button.value);
              }}
              key={button.value}>
              {button.label}
            </Button>
          ))}
          <Button variant="outlined" onClick={() => toggleCalendar()}>
            <TodayIcon />
          </Button>
        </Stack>
      </div>
      {dates.length > 0 && calendar ? <Calendar dates={dates} /> : ""}
    </Box>
  );
};

export default PersonalSchedule;
