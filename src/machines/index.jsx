import { createMachine, assign } from "xstate";

const onMonthChange = (direction, context) => {
  console.log("onMonthChange", direction, context);
};

const automataMachine = createMachine(
  {
    id: "Core Automata",
    initial: "init",
    context: {
      currentYear: "",
      timeAllocated: "",
      weekOrDayAllocated: "",
      dates: [],
      tasks: [],
    },
    states: {
      init: {
        on: {
          SCHEDULE: "schedule",
        },
      },
      task: {
        on: {
          ADD_TASK: {
            actions: "addTask",
          },
          ASSIGN_TASK: {
            actions: "assignTask",
          },
        },
      },
      schedule: {
        initial: "currentYear",
        on: {
          ADD_INITIAL_DATES: {
            actions: "addInitialDates",
          },
          SET_TIME_ALLOCATED: {
            actions: "setSelectedTime",
          },
          SET_WEEK_DAY_ALLOCATION: {
            actions: "setWeekOrDayAllocated",
          },
          ADD_TASK: {
            actions: "addTask",
          },
          CHANGE_MONTH: {
            actions: "changeMonth",
          },
          CHANGE_YEAR: {
            actions: "changeYear",
            target: "schedule.anotherYear",
          },
        },
        states: {
          currentYear: {},
          anotherYear: {},
        },
      },
    },
  },
  {
    actions: {
      addTask: (context, event) => {
        console.log("adding a new task", context, event);
      },
      addInitialDates: assign({
        dates: (_, event) => event.payload,
        currentYear: (_, event) => event.payload[0].year,
      }),
      setSelectedTime: assign({
        timeAllocated: (_, event) => event.payload,
      }),
      setWeekOrDayAllocated: assign({
        weekOrDayAllocated: (_, event) => event.payload,
      }),
      assignTask: (context, event) => {
        console.log("assignTask", context, event);
      },
      changeMonth: (context, event) => {
        console.log("changeMonth", context, event);
      },
    },
  }
);

export default automataMachine;
