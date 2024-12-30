import React from "react";
import Image from "next/image";
import logo from "../../assests/pngimages/Worthylogo.jpg";

const Project = () => {
  return (
    <div>
      <div className="border-2 border-gray-300 rounded-xl mx-8 flex flex-col md:flex-row my-1 py-4">
        {/* left side box */}
        <div className="w-full md:w-1/3 flex flex-row p-4 items-center justify-center ">
          <div className="w-72 md:w-96">
            <Image
              src={logo}
              alt="image"
              width={256}
              height={256}
              className="rounded-md"
            />
          </div>
        </div>

        {/* right side box */}
        <div className="w-full md:w-2/3 flex flex-col justify-center gap-4">
          <div className="text-[36px] font-bold px-8 py-2 text-[#40348C]">
            Name of the portfolio project
          </div>
          <div>
            This project focuses on enhancing the user experience of Flipkart,
            India’s leading e-commerce platform, by identifying pain points and
            delivering an intuitive design solution. The primary objectives
            include streamlining the navigation flow.
          </div>
          <div className=" flex flex-row mt-4  text-[#40348C] justify-start items-center gap-2 font-bold">
            <div>ARTIFICIAL INTELLIGENCE</div>
            <div className="w-1 h-1 bg-[#40348C]"></div>
            <div>TECHNOLOGY</div>
          </div>
          <div>
            <button className="bg-[#40348C] text-white p-2 mt-4 rounded-sm">
              OPEN PROJECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
