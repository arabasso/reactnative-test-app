import { ApiContext } from "@contexts/Api";
import { useContext } from "react";

export const useApi = () => useContext(ApiContext);