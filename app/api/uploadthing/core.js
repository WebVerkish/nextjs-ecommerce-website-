import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  
  categoryImageUploader: f({ image: { maxFileSize: "2MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    bannerImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    marketImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    productImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    bannerImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    trainingImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    farmerProfileUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    customerProfileUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(async () => {
      return { uploadedBy: "Ecom" };
    }),
    multipleProductsUploader: f({ image: { maxFileSize: "9MB",maxFileCount:6 } }).onUploadComplete(async ({metadata,file}) => {
      return { uploadedBy: "Ecom" };
    }),
};