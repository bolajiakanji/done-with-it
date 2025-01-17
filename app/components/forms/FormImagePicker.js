import React, {useState} from "react";
import { useFormikContext } from "formik";
import { View,Text } from "react-native";


import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";
import Camera from "../Camera";


function FormImagePicker({ name }) {
  const [camera, setCamera] = useState(false);

  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleDelete = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <View>
      {camera &&
        <View style={{
          position: 'absolute', top: 5, left: 0, width: '100%', height: '500', zIndex: 10,
          backgroundColor: 'blue'
        }}>
          <Camera onShot={handleAdd} setCamera={setCamera} />
        
        </View>}
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleDelete}
        setCamera={setCamera}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default FormImagePicker;
