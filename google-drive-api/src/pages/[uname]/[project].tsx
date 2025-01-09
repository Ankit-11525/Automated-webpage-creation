import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type Section = {
  heading: string;
  subheading: string;
  description: string;
  images: string[];
};
const Project = () => {
  const router = useRouter();
  const { uname, project } = router.query;
  const [projectData, setProjectData] = useState<Section[]>([]);
  // check uname is a string, handle undefined or array cases
  const userName = Array.isArray(uname) ? uname[0] : uname || "";
  useEffect(() => {
    if (uname && project) {
      const fetchProjectData = async () => {
        const res = await fetch(
          `/api/get-file-content?folderName=${uname}&fileName=${project}`
        );
        const data: Section[] = await res.json();
        setProjectData(data);
      };

      fetchProjectData();
    }
  }, [uname, project]);

  return (
    <div>
      <div className="px-2 md:px-16">
        <Navbar uname={userName} />
        <div className="w-full h-[60vh] bg-slate-300 rounded-md mt-8"></div>
        <div className="flex flex-col gap-2 justify-center mt-8">
          <div className="text-[24px] md:text-[32px] font-bold  font-Nohemi">
            {userName}
          </div>
          <div className=" text-[40px] md:text-[54px] font-bold text-[#40348C] font-Nohemi ">
            I help brands & startups speed up development with UX Design
          </div>
          <div className="mt-4 text-[16px] md:text-[18px]">
            This project focuses on enhancing the user experience of Flipkart,
            India’s leading e-commerce platform, by identifying pain points and
            delivering an intuitive design solution.
          </div>
          <div className=" text-[16px] md:text-[18px]">
            The primary objectives include streamlining the navigation flow,
            improving search and filtering options, and optimizing the checkout
            process for faster conversions.
          </div>
        </div>

        {/* ------------------------------------------ith section--------------------------------- */}
        <div>
          <div className="flex flex-col gap-2 justify-center mt-8">
            {projectData.map((sectionrow: Section, index: number) => (
              <div key={index}>
                <div className="text-[16px] md:text-[24px] font-bold  font-Nohemi">
                  {sectionrow.subheading}
                </div>
                <div className=" text-[40px] md:text-[54px] font-bold text-[#40348C] font-Nohemi ">
                  {sectionrow.heading}
                </div>
                <div className="mt-4 text-[16px] md:text-[18px]">
                  {sectionrow.description}
                </div>

                <div
                  className={`flex flex-col ${
                    sectionrow.images.length > 1
                      ? "md:flex-row md:flex-wrap border-2 border-r-emerald-400 items-center gap-2 justify-around "
                      : ""
                  }`}
                >
                  {sectionrow.images.map((image: string, i: number) => {
                    const getWidthClass = () => {
                      if (sectionrow.images.length === 1) {
                        return "w-full";
                      } else if (sectionrow.images.length === 2) {
                        return "w-2/5";
                      } else if (sectionrow.images.length === 3) {
                        return "w-1/4";
                      } else if (sectionrow.images.length === 4) {
                        return "w-2/5"; // For a 2x2 grid
                      }
                    };

                    return (
                      <div
                        key={i}
                        className={`${getWidthClass()} h-[40vh] md:h-[60vh] rounded-md mt-8 overflow-hidden border-2 border-r-emerald-400`}
                      >
                        <Image
                          src={image}
                          alt="projectimage"
                          width={256}
                          height={256}
                          className="w-full h-full  max-w-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
