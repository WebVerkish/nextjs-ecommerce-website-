import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";

// Assuming FileRouter is already defined elsewhere, and you don't need the type for it in JS
  export const UploadButton = generateUploadButton();
  export const UploadDropzone = generateUploadDropzone();

  // import { generateComponents } from "@uploadthing/react";

  // export const { UploadButton, UploadDropzone, Uploader } = generateComponents();

