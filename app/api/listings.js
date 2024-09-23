import client from "./client";
//import { fileFromPath } from 'formdata-node/file-from-path';
//import fs from 'fs';

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export const addListing =  (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach(async(image, index) =>
    data.append("images", {
      uri: image,
      name: "image" + index,
      type: "image/jpeg",
    })
  );

  

  
  
  console.log(data)

 
  return  client.post(endpoint, data, {
  

    
   headers:{'content-type': 'multipart/form-data'},
    
    
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
 }

);
};

export default {
  addListing,
  getListings,
};

 //   {
    //   name: "image" + index,
    //   type: "image/jpeg",
    //   url: image,
// }
    
//const result = listing.images.map((image, index) =>image
 // if (listing.location)
//   data.append("location", JSON.stringify(listing.location));
 //const { title, price, description, category: { value } } = listing
 //let you = { title, price, description, categoryId: value}