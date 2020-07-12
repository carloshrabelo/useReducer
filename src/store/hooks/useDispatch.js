import { useContext } from "react";
import StoreContext from "../StoreContext";

export default () => useContext(StoreContext).dispatch;
