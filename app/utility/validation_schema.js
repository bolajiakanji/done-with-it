import * as Yup from "yup";

export const editValidationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(100).max(10000000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array()
    .min(1, "Please select at least one image.")
    .max(6, "Selected image should not be more than 6 images"),
});

export const accountValidationSchema = Yup.object().shape({
  heading: Yup.string().required().min(1).label("Heading"),
  contactInfo: Yup.string().required().min(1).label("Contact_info"),
});

