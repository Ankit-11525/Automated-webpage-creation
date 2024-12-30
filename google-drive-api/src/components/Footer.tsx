import React from "react";
import verified from "../../assests/svg/verification-symbol-svgrepo-com.svg";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="w-full bg-[#2F2F2F] flex flex-col sm:flex-row justify-between text-white px-2 pb-8">
      <div className="flex flex-col mt-4 justify-center sm:ml-8">
        <div>MADE WITH</div>
        <div className="flex flex-row items-center gap-1">
          <div style={{ filter: "invert(100%)" }}>
            <Image src={verified} alt="verified" width={16} height={16} />
          </div>
          WorthyJobs
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col mt-4 mr-8">
          <div className="text-[16px]">Contact</div>
          <div className=" text-[14px]">sanidhya tulsinandan@worthyjobs.in</div>
        </div>

        <div className="flex flex-col mt-4 mr-8">
          <div className="text-[16px]">COPYRIGHT</div>
          <div className=" text-[14px]">All rights reserved 2024</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
