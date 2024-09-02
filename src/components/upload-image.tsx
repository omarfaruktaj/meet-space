// import { Image, Trash } from "lucide-react";
// import { Button } from "./ui/button";
// import axios from "axios";
// import React, { useState } from "react";

// interface UploadImageProps {
//   disabled?: boolean;
//   onChange: (value: string[]) => void;
//   onRemove: (value: string) => void;
//   value: string[];
// }

// export default function UploadImage({
//   disabled,
//   onChange,
//   onRemove,
//   value,
// }: UploadImageProps) {
//   const [isUploading, setIsUploading] = useState(false);

//   const handleImageUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       setIsUploading(true);

//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append(
//         "upload_preset",
//         `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
//       );
//       formData.append("folder", "meet-space");

//       try {
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${
//             import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
//           }/image/upload`,
//           formData
//         );
//         const imageUrl = response.data.secure_url;
//         onChange(imageUrl);
//       } catch (error) {
//         console.error("Image upload failed:", error);
//       } finally {
//         setIsUploading(false);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4 flex items-center flex-wrap gap-4">
//         {value.map((url) => (
//           <div
//             key={url}
//             className="relative w-[60px] h-[60px] rounded-md overflow-hidden"
//           >
//             <div className="relative z-10">
//               <Button
//                 type="button"
//                 onClick={() => onRemove(url)}
//                 variant={"destructive"}
//                 size={"icon"}
//                 disabled={disabled}
//                 className="fixed"
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//               <img
//                 className="object-cover w-full h-full"
//                 alt="Uploaded"
//                 src={url}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <label
//         htmlFor="file-upload"
//         className="flex items-center gap-2 cursor-pointer mt-4 bg-muted p-2 w-44 rounded-md "
//       >
//         <Image className="h-4 w-4 mt-1" />
//         <span>Upload Image</span>
//       </label>
//       <input
//         id="file-upload"
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         disabled={disabled || isUploading}
//         className="hidden"
//       />
//       {isUploading && <p>Uploading...</p>}
//     </div>
//   );
// }

import { Image, Trash } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import React, { useState } from "react";

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function UploadImage({
  disabled,
  onChange,
  onRemove,
  value,
}: UploadImageProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setIsUploading(true);

      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
      );
      formData.append("folder", "meet-space");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;
        onChange(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="pt-2 ">
      <div className="mb-4 flex items-center flex-wrap gap-4">
        {value.length === 0 ? (
          <p>No images uploaded yet.</p>
        ) : (
          value.map((url) => (
            <div
              key={url}
              className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
            >
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
                disabled={disabled}
                className="absolute top-0 right-0  h-6 w-6 "
              >
                <Trash className="h-4 w-4 " />
              </Button>
              <img
                className="object-cover w-full h-full"
                alt="Uploaded"
                src={url}
              />
            </div>
          ))
        )}
      </div>

      <label
        htmlFor="file-upload"
        className="flex items-center gap-2 cursor-pointer mt-4 bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        <Image className="h-6 w-6" />
        <span className="font-semibold">Upload Image</span>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={disabled || isUploading}
        className="hidden"
      />
      {isUploading && <p className="mt-2 text-blue-500">Uploading...</p>}
    </div>
  );
}
