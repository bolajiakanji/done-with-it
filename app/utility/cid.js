import { Cloudinary } from "@cloudinary/url-gen";

function myCloud () {
return new Cloudinary({
    cloud: {
      cloudName: "dlutiw9i4",
    },
  });
}

export default myCloud