import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, active, style }) {
  const { handleSubmit } = useFormikContext();

  return <Button
    title={title}
    onPress={handleSubmit}
    active={active}
  />;
}

export default SubmitButton;
