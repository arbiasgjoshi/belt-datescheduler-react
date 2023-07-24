import * as React from "react";
import { useEffect, useState } from "react";

import { useMachine } from "@xstate/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import tasksData from "@/data/tasks.json";
import { makeStyles } from "@mui/styles";
import { parse, getMonth, getDate } from "date-fns";

import TodayIcon from "@mui/icons-material/Today";
import automataMachine from "@/machines";
import {
  addInitialDates,
  allocatedTimeButtons,
  allocatedWeekButtons,
} from "@/helpers";

import Calendar from "@components/organisms/calendar";

import "./index.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles({
  button: {
    "&:active": {
      background: "black",
    },
    "&:hover": {
      background: "red",
    },
    "&:focus": {
      outline: "none !Important",
    },
  },
});

const PersonalSchedule = () => {
  const [state, send] = useMachine(automataMachine);
  const [calendar, setCalendar] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const { dates, timeAllocated, weekOrDayAllocated } = state.context;

  const calculateProgress = () => {
    // const progressDates = tasksData.group(({ allocatedDate }) => allocatedDate);
    // console.log(tasksData);
  };

  useEffect(() => {
    send("SCHEDULE");
    calculateProgress();
    let printedDates = addInitialDates();

    for (let i = 0; i < tasksData.length; i++) {
      const task = tasksData[i];
      const allocatedDate = parse(task.allocatedDate, "dd/MM/yyyy", new Date());
      const month = getMonth(allocatedDate);
      const date = getDate(allocatedDate);

      if (
        printedDates[month] &&
        printedDates[month].dates[date] &&
        printedDates[month].dates[date].formatedDate === task.allocatedDate
      ) {
        // Add the task to the allocatedTasks array of the matching date
        printedDates[month].dates[date].allocatedTasks.push({
          name: task.taskName,
          duration: task.taskDuration,
        });
      }
    }

    send({
      type: "ADD_INITIAL_DATES",
      payload: printedDates,
    });
  }, []);

  useEffect(() => {
    if (timeAllocated && weekOrDayAllocated) {
      setLoading(true);
      setTimeout(() => {
        setOpen(true);
        setLoading(false);
      }, 1000);
    }
  }, [timeAllocated, weekOrDayAllocated]);

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

  const buttonStyle = (btn) => {
    return {
      borderColor: btn ? "#2D94ff" : "#EBEBEE",
      borderRadius: "10px",
      color: btn ? "#00174C" : "#42474E",
    };
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (reason === "timeout") {
      onWeekOrDayAllocated(null);
      onAllocateTime(null);
    }

    setOpen(false);
  };

  const formatAllocation = (value) => {
    if (value === "weekAfter") {
      return "week after";
    }

    if (value === "nextWeek") {
      return "next week";
    }

    if (value === "currentWeek") {
      return "this week";
    }

    return value;
  };

  return (
    <>
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
          <Stack spacing={2} direction="row" sx={{ marginBottom: "15px" }}>
            <h3>Duration</h3>

            {allocatedTimeButtons.map((button) => (
              <Button
                variant="outlined"
                className={classes.button}
                sx={() => buttonStyle(button.value === timeAllocated)}
                onClick={() => {
                  onAllocateTime(button.value);
                }}
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
                className={classes.button}
                sx={() => buttonStyle(button.value === weekOrDayAllocated)}
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
        {dates.length > 0 && calendar ? (
          <Calendar
            dates={dates}
            onSelectedDate={(date) => {
              onWeekOrDayAllocated(date);
              setCalendar(false);
            }}
          />
        ) : (
          ""
        )}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your task of {timeAllocated} has been saved successfully for{" "}
          {formatAllocation(weekOrDayAllocated)}.
        </Alert>
      </Snackbar>
      {loading ? (
        <CircularProgress
          sx={{ position: "fixed", bottom: "20px", right: "20px" }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PersonalSchedule;
