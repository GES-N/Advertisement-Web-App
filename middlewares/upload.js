
import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg"; 
//using multer-storage-cloudinary instead of savefiles.org
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


export const adsImageUpload = multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "adsWebApp-api/ads-images",
      //   format: async (req, file) => "png", // supports promises as well
      //   public_id: (req, file) => "computed-filename-using-request",
      // public_id: (req, file) =>file.originalname,
      },
    }),
  });


