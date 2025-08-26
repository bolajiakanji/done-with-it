import client from "./client";

const endpoint = "/listings";

const getListings = (bol) => {
  return client.get(endpoint, bol);
};
export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach(async (image, index) =>
    data.append("images", {
      uri: image,
      name: "image" + index,
      type: "image/jpeg",
    }, `image${index}`)
  );

  return client.post(endpoint, data, {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

export default {
  addListing,
  getListings,
};

