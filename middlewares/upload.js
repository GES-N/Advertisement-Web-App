
import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg"; 




export const adsImageUpload = multer({
    storage:multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/ads-web-app/product-images/*'
    })
}
)
