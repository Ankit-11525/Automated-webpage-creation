import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import "../../../styles/globals.css";
import Image from "next/image";
import logo from "../../../assests/pngimages/Worthylogo.jpg";
const Portfolio = () => {
  const router = useRouter();
  const { uname } = router.query;

  // check uname is a string, handle undefined or array cases
  const userName = Array.isArray(uname) ? uname[0] : uname || "";

  return (
    <div className="px-4">
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
            India’s leading e-commerce platform, by identifying pain points and
            delivering an intuitive design solution.
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
          <div className=" text-[44px] md:text-[64px] font-bold text-[#40348C] font-Nohemi ">
            A little about Me :)
          </div>
          <div className="mt-8 text-[16px] md:text-[18px]">
            This project focuses on enhancing the user experience of Flipkart,
            India’s leading e-commerce platform, by identifying pain points and
            delivering an intuitive design solution. The primary objectives
            include streamlining the navigation flow.
          </div>
          <div className="mt-8 text-[16px] md:text-[18px]">
            This project focuses on enhancing the user experience of Flipkart,
            India’s leading e-commerce platform, by identifying pain points and
            delivering an intuitive design solution. The primary objectives
            include streamlining the navigation flow.
          </div>
          <button className="bg-[#40348C] text-white py-2 px-4 mt-4 rounded-sm">
            “It’s great to lead a life of risk than that of regret ”
          </button>
        </div>
      </div>





{/* --------------------------------------third section ---------------------------------------- */}

    </div>
  );
};

export default Portfolio;