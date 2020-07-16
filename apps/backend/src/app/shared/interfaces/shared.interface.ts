export interface IErrorMessage {
  error: boolean;
  message: string;
}
export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
