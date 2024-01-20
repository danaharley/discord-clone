"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

type FileUploadProps = {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
};

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="images"
          fill
          className="rounded-full"
          sizes="100%"
        />
        <button
          className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white shadow-sm"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="ut-button:ut-ready:bg-indigo-500 ut-button:ut-uploading:bg-indigo-500/50 ut-label:text-indigo-500 disabled:ut-button:ut-uploading:cursor-not-allowed"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(`file upload: `, error.message);
      }}
    />
  );
};
