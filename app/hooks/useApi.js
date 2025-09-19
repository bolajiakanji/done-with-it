import { useState } from "react";

export default useApi = (apiFunc) => {
const request = async (...args) => {
    return apiFunc(...args);
  };
  return request;
};
