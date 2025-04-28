import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function MultipleImageInput({
  label,
  imageUrls,
  setImageUrls,
  className = "col-span-full",
  endpoint = "",
}) {
  function handleImageRemove(imageIndex){
    const updatedImages = imageUrls.filter((image,index)=>index !== imageIndex);
    setImageUrls(updatedImages);
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2 dark:text-slate-50"
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => {
            return (
              <div key={index} className="relative mb-6">
                <button onClick={()=>handleImageRemove(index)} className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full ">
                  <XCircle className=""/>
                </button>
                <Image
                  src={url}
                  alt="Item image"
                  width={1000}
                  height={667}
                  className="w-full h-32 object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            // setImageUrl(res[0].url);
            // //console.log("Files: ", res);
            // //console.log("Upload Completed");
            // toast.success("Image Upload Completed");
            const urls  = res.map((file) => file.url);
            setImageUrls(urls);
            console.log(res);
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            //console.log(`ERROR! ${error.message}`);
            toast.error("Error Uploading Image");
          }}
        />
      )}
    </div>
  );
}
