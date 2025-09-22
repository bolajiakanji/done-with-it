import React from "react";
import { useFormikContext } from "formik";
import Button from "../Button";
import { ActivityIndicator } from "react-native";

function SubmitButton({ title, active, style}) {
  const { handleSubmit } = useFormikContext();

  const   LoadingIndicator = () => (
    <ActivityIndicator size={23} color='#000000'/>
  )

  return <Button
    title={ active ? title : <LoadingIndicator />}
    onPress={handleSubmit}
    active={active}
    style={style}
  />;
}

export default SubmitButton;
