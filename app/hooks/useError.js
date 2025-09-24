import { useContext, useState } from "react";
import ErrorMessage from "../context/error";
import ErrorContext from "../context/error";

export default useError = () => useContext(ErrorContext);