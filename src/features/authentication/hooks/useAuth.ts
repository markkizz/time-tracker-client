import { useContext } from "preact/hooks";
import { authContext } from "../context/authContext";

export const useAuth = () => useContext(authContext)