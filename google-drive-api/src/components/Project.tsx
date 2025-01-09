import React from "react";
import Image from "next/image";
import Link from "next/link";
interface ProjectProps {
  foldername: string;
  filename: string;
  description: string;
  category: string;
  image: string;
}
const Project = ({
  foldername,
  filename,
  description,
  category,
  image,
}: ProjectProps) => {
  console.log(filename);
  const nameWithoutExtension = filename.replace(/\.xlsx$/, "");
  return (
    <div>
      <div className="border-2 border-gray-300 rounded-xl mx-2 md:mx-8 flex flex-col md:flex-row my-1 py-4 px-1">
        {/* left side box */}
        <div className="w-full md:w-1/3 flex flex-row p-4 items-center justify-center ">
          <div className="w-72 md:w-96">
            <Image
              src={image}
              alt="image"
              width={256}
              height={256}
              className="rounded-md"
            />
          </div>
        </div>

        {/* right side box */}
        <div className="w-full md:w-2/3 flex flex-col justify-center gap-4">
          <div className="text-[36px] font-bold  py-2 text-[#40348C]">
            {nameWithoutExtension}
          </div>
          <div>
            {description}
            This project focuses on enhancing the user experience of Flipkart,
            India’s leading e-commerce platform, by identifying pain points and
            delivering an intuitive design solution. The primary objectives
            include streamlining the navigation flow.
          </div>
          <div className=" flex flex-row mt-4  text-[#40348C] justify-start items-center gap-2 font-bold">
            <div>{category}</div>
          </div>
          <div>
            <Link href={`/${foldername}/${filename}`}>
              <button className="bg-[#40348C] text-white p-2 mt-4 rounded-sm flex flex-row gap-2">
                OPEN PROJECT
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
