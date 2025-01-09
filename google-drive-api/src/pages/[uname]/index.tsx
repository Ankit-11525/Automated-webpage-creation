import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import Project from "@/components/Project";
import ReasonCard from "@/components/ReasonCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type File = {
  id: string;
  name: string;
};

interface Project {
  heading: string;
  description: string;
  category: string;
  image: string;
}
interface Quality {
  heading: string;
  description: string;
  image: string;
}
interface HeroSection {
  heading: string;
  description: string;
  image: string;
}
interface AboutMeSection {
  heading: string;
  description1: string;
  description2: string;
  quote: string;
  images: string[];
}
interface Portfoliosection {
  heading: string;
  description: string;
}
interface HiringSection {
  heading: string;
  description: string;
}
interface PortFolioData {
  HeroSection: HeroSection;
  AboutMeSection: AboutMeSection;
  Portfoliosection: Portfoliosection;
  ProjectArray: Project[];
  HiringSection: HiringSection;
  QualityArray: Quality[];
}
const Portfolio = () => {
  const router = useRouter();
  const { uname, id } = router.query;

  // check uname is a string, handle undefined or array cases
  const userName = Array.isArray(uname) ? uname[0] : uname || "";
  const [files, setFiles] = useState<File[]>([]);
  const [portFolioData, setPortFolioData] = useState<PortFolioData>();
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(`/api/get-all-files?id=${id}`);
        const data = await res.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (id) {
      fetchFolders(); // Only call this if `id` is available
    }
  }, [id]); // Only re-run when `id` changes
  useEffect(() => {
    if (uname && id) {
      const fetchPortfolioData = async () => {
        const res = await fetch(`/api/get-portfolio-details?id=${id}`);
        const data: PortFolioData = await res.json();
        console.log(data);
        setPortFolioData(data);
      };

      fetchPortfolioData();
    }
  }, [uname, id]);
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
              {portFolioData?.HeroSection.description}
            </div>
            <button className="bg-[#40348C] text-white p-2 mt-4 rounded-sm">
              SCROLL DOWN
            </button>
          </div>

          {/* right box  */}
          <div className="w-full md:w-2/5 flex p-1 items-center justify-center ">
            <div className="w-96 h-96 overflow-hidden relative">
              {portFolioData?.HeroSection.image && (
                <Image
                  src={portFolioData?.HeroSection.image}
                  alt="image"
                  width={256}
                  height={256}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                />
              )}
            </div>
          </div>
        </div>

        {/* --------------------------------------second section ---------------------------------------- */}

        <div className="w-full flex flex-col md:flex-row  mx-auto mt-8 ">
          {/* left box  */}
          <div className="w-full md:w-1/2 flex flex-row p-4 items-center justify-center ">
            <div className="flex flex-col gap-24">
              <div className="flex flex-row gap-8 p-4  items-center justify-center">
                <div className="w-48 h-48">
                  {portFolioData?.AboutMeSection?.images[0] && (
                    <Image
                      src={portFolioData.AboutMeSection.images[0]}
                      alt="image"
                      width={256}
                      height={256}
                      className="rounded-md"
                    />
                  )}
                </div>
                <div className="w-48 h-48">
                  {portFolioData?.AboutMeSection?.images[1] && (
                    <Image
                      src={portFolioData.AboutMeSection.images[0]}
                      alt="image"
                      width={256}
                      height={256}
                      className="rounded-md"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-8 p-4 items-center justify-center">
              <div className="w-48 h-48">
                  {portFolioData?.AboutMeSection?.images[2] && (
                    <Image
                      src={portFolioData.AboutMeSection.images[0]}
                      alt="image"
                      width={256}
                      height={256}
                      className="rounded-md"
                    />
                  )}
                </div>
                <div className="w-48 h-48">
                  {portFolioData?.AboutMeSection?.images[3] && (
                    <Image
                      src={portFolioData.AboutMeSection.images[0]}
                      alt="image"
                      width={256}
                      height={256}
                      className="rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* right box  */}
          <div className="w-full md:w-1/2 p-16 ">
            <div className=" text-[40px] md:text-[64px] font-bold text-[#40348C] font-Nohemi text-center">
              A little about Me :)
            </div>
            <div className="mt-8 text-[16px] md:text-[18px]">
              {portFolioData?.AboutMeSection.description1}
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution. The primary
              objectives include streamlining the navigation flow.
            </div>
            <div className="mt-8 text-[16px] md:text-[18px]">
              {portFolioData?.AboutMeSection.description2}
              This project focuses on enhancing the user experience of Flipkart,
              India’s leading e-commerce platform, by identifying pain points
              and delivering an intuitive design solution. The primary
              objectives include streamlining the navigation flow.
            </div>
            <div className="flex flex-row justify-center">
              <button className="bg-[#40348C] text-white text-xl py-4 px-8 mt-12 rounded-md ">
                {portFolioData?.AboutMeSection.quote}
              </button>
            </div>
          </div>
        </div>

        {/* --------------------------------------third section ---------------------------------------- */}
        <div className="mt-36">
          <div className="w-full">
            <div className=" text-[36px] font-bold px-2 md:px-8 py-2 text-[#40348C]">
              Portfolio Projects
            </div>
            <div className=" text-[20px] px-2 md:px-8 py-2 mt-8">
              {portFolioData?.Portfoliosection.description}
            </div>
          </div>

          <div className="flex flex-col gap-8 justify-center">
            {portFolioData?.ProjectArray.map((project, index) => (
              <div key={index}>
                {files[index] && (
                  <Project
                    foldername={userName}
                    filename={files[index]?.name}
                    category={project.category}
                    description={project.description}
                    image={project.image}
                  />
                )}
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
              {portFolioData?.HiringSection.description}
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center mt-8 px-2 md:px-8 py-2">
            {portFolioData?.QualityArray.map((quality, index) => (
              <div key={index}>
                <ReasonCard
                  description={quality.description}
                  heading={quality.heading}
                  image={quality.image}
                />
              </div>
            ))}
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
