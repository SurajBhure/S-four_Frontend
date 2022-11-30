import React, { useState } from "react";

export const useForm = (initialState) => {
  const [state, setState] = useState(initialState);
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return {
    state,
    onHandleChange,
  };
};

