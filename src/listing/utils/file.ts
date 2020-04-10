import { extname } from "path";
import { v1 as uuid } from 'uuid';

export const generateImageFileName = (file) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  return `${name}-${uuid()}${fileExtName}`;
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
