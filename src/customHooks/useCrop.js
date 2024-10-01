import axios from "axios";
import { base64 } from "../utils/base64";


export default async function useCropFace(image, setIsLoading) {
  if (image) {
    setIsLoading(true);
    const { img, isBase64 } = image;
    try {
      let base64Img;

      if (!isBase64) {
        base64Img = await new Promise((resolve, reject) => {
          base64(img.src, (base64Data) => {
            if (base64Data) {
              resolve(base64Data);
            } else {
              reject(new Error("Base64 conversion failed"));
            }
          });
        });
      } else {
        base64Img = img;
      }

      const response = await axios.post("https://52.56.108.15/cropsingle", {
        image: base64Img.split(",")[1],
      });

      // console.log(response,'response from server crop');
      // console.log("single face crop ho gaya =>", response.data);
      setIsLoading(false);
      // console.log(response.data.first[0].length);
      return {userFace:response.data.first[0],metaData:response.data.second[0]};
    } catch (error) {
      setIsLoading(false);
      console.error("Error in useCropFace:", error);
      throw error;
    }
  } else {
    console.log("img is not there in useCropFace");
    throw new Error("No image provided");
  }
}
