import { createMachine } from "xstate";

// create a machine to perform a login function. It is guarded by an API request that has a status of pending, error or success. All is done with async and await actions. Data is passed in as props (such as username and password).

const onMonthChange = (direction, context) => {
  console.log("onMonthChange", direction, context);
};

const addInitialDates = () => {};

const automata = createMachine({
  id: "Core Automata",
  initial: "init",
  context: {
    currentYear: "",
    dates: [],
  },
  states: {
    init: {
      on: {
        SCHEDULE: "schedule",
        ADD_INITIAL_DATES: {
          actions: "addInitialDates",
        },
      },
    },
    schedule: {
      on: {
        ADD_TASK: {
          actions: "addTask",
        },
        ASSIGN_TASK: {
          actions: "assignTask",
        },
        CHANGE_YEAR: {
          actions: "changeMonth",
        },
      },
      states: {
        addTask: {},
        assignTask: {},
      },
    },
  },
});

export default automata;
