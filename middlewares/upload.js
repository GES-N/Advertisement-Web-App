
import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg"; 
//using multer-storage-cloudinary instead of savefiles.org
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const adsImageUpload = multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "adsWebApp-api/ads-images",
      }
    }),
  });



  export const  uploadLogo = multer ({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "adsWebApp-api/ads-uploadLogo",
      }
    }),
  })