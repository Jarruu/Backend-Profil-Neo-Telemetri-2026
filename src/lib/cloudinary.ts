import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const baseUrl = req.baseUrl || '';
    let folderName = 'neo-telemetri-profile/others';

    if (baseUrl.includes('projects') || baseUrl.includes('marketing')) {
      folderName = 'neo-telemetri-profile/projects';
    } else if (baseUrl.includes('news') || baseUrl.includes('pr')) {
      folderName = 'neo-telemetri-profile/news';
    }

    return {
      folder: folderName,
      format: 'png',
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

export default cloudinary;
