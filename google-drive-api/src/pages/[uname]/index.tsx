import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../assests/pngimages/Worthylogo.jpg";
import Project from "@/components/Project";
import ReasonCard from "@/components/ReasonCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type File = {
  id: string;
  name: string;
};
const Portfolio = () => {
  const router = useRouter();
  const { uname, id } = router.query;

  // check uname is a string, handle undefined or array cases
  const userName = Array.isArray(uname) ? uname[0] : uname || "";
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await fetch(`/api/get-all-files?id=${id}`);
      const data = await res.json();
      setFiles(data);
    };

    fetchFolders();
  });
  return (
    <div>
      <div className="px-1 md:px-8">
        <Navbar uname={userName} />
        
        {/* --------------------------------------first section ---------------------------------------- */}

        <div className="w-full flex flex-col md:flex-row  mx-auto mt-8 ">
          {/* left box  */}
          <div className="w-full md:w-3/5 p-4 ">
            <div className=" text-[44px] md:text-[64px] font-bold text-[#40348C] font-Nohemi ">
              I help brands & startups speed up development with UX Design
            </div>
            <div className="mt-8 text-[16px] md:text-[18px]">
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution.
            </div>
            <button className="bg-[#40348C] text-white p-2 mt-4 rounded-sm">
              SCROLL DOWN
            </button>
          </div>

          {/* right box  */}
          <div className="w-full md:w-2/5  flex  p-4 items-center justify-center">
            <div className="w-72 h-72  ">
              <Image
                src={logo}
                alt="image"
                width={256}
                height={256}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {/* --------------------------------------second section ---------------------------------------- */}

        <div className="w-full flex flex-col md:flex-row  mx-auto mt-8 ">
          {/* left box  */}
          <div className="w-full md:w-1/2 flex flex-row p-4 items-center justify-center">
            <div className="w-72 md:w-96 grid grid-cols-2 gap-4">
              <Image
                src={logo}
                alt="image"
                width={256}
                height={256}
                className="rounded-md"
              />
              <Image
                src={logo}
                alt="image"
                width={256}
                height={256}
                className="rounded-md"
              />
              <Image
                src={logo}
                alt="image"
                width={256}
                height={256}
                className="rounded-md"
              />
              <Image
                src={logo}
                alt="image"
                width={256}
                height={256}
                className="rounded-md"
              />
            </div>
          </div>

          {/* right box  */}
          <div className="w-full md:w-1/2 p-4 ">
            <div className=" text-[40px] md:text-[64px] font-bold text-[#40348C] font-Nohemi ">
              A little about Me :)
            </div>
            <div className="mt-8 text-[16px] md:text-[18px]">
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution. The primary
              objectives include streamlining the navigation flow.
            </div>
            <div className="mt-8 text-[16px] md:text-[18px]">
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution. The primary
              objectives include streamlining the navigation flow.
            </div>
            <button className="bg-[#40348C] text-white py-2 px-4 mt-4 rounded-sm">
              “It’s great to lead a life of risk than that of regret ”
            </button>
          </div>
        </div>

        {/* --------------------------------------third section ---------------------------------------- */}
        <div className="mt-36">
          <div className="w-full">
            <div className=" text-[36px] font-bold px-2 md:px-8 py-2 text-[#40348C]">
              Portfolio Projects
            </div>
            <div className=" text-[20px] px-2 md:px-8 py-2 mt-8">
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution. The primary
              objectives include streamlining the navigation flow.
            </div>
          </div>

          <div className="flex flex-col gap-8 justify-center">
            {files &&
              files.map((file, index) => (
                <div key={index}>
                  <Project foldername={userName} fileid={file.id} filename={file.name}/>
                </div>
              ))}
          </div>
        </div>

        {/* --------------------------------------fourth section ---------------------------------------- */}
        <div className="mt-36">
          <div className="w-full">
            <div className=" text-[36px] font-bold px-2 md:px-8 py-2 text-[#40348C]">
              3 reason to hire me
            </div>
            <div className=" text-[20px] px-2 md:px-8 py-2 mt-8">
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution. The primary
              objectives include streamlining the navigation flow.
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center mt-8 px-2 md:px-8 py-2">
            <ReasonCard />
            <ReasonCard />
            <ReasonCard />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
