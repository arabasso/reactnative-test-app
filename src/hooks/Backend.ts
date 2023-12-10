import { BackendContext } from "@contexts/Backend";
import { useContext } from "react";

export const useBackend = () => useContext(BackendContext);