"use client";

import Image from "next/image";
import Link from "next/link";
import { FileIcon, X } from "lucide-react";

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
          className="rounded-full object-cover object-center"
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

  if (value && fileType === "pdf") {
    return (
      <div className="relative mt-2 flex items-center rounded-md bg-black/[5%] p-2">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
        >
          {value}
        </Link>
        <button
          onClick={() => onChange("")}
          className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="ut-label:text-indigo-500 ut-button:ut-ready:bg-indigo-500 ut-button:ut-uploading:bg-indigo-500/50 disabled:ut-button:ut-uploading:cursor-not-allowed"
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
