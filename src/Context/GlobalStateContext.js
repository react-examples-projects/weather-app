import constate from "constate";
import useGlobalState from "../Hooks/useGlobalState";

const [GlobalStateProvider, useGlobalStateContext] = constate(useGlobalState);
export { GlobalStateProvider, useGlobalStateContext };
