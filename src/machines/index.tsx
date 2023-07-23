import { createMachine } from "xstate";

// create a machine to perform a login function. It is guarded by an API request that has a status of pending, error or success. All is done with async and await actions. Data is passed in as props (such as username and password).

const automata = createMachine({
  id: "Core Automata",
  initial: "init",
  states: {
    init: {},
    login: {},
    schedule: {},
    complete: {},
  },
});

export default automata;
