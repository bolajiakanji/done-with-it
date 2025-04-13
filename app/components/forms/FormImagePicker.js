import React, {useState} from "react";
import { useFormikContext } from "formik";
import { View,Text, Modal } from "react-native";


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
      
        <Modal 
        visible={camera}
        >
          <Camera onShot={handleAdd} setCamera={setCamera} />
        
        </Modal> 
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
