import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import router from "next/router";
type Folder = {
  id: string;
  name: string;
};

const Home = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("/api/get-all-folders");

        if (!res.ok) {
          // Check if the error status is 500
          if (res.status === 500) {
            const errorData = await res.json();
            // Handle specific invalid grant error
            if (errorData.error.response.data.error === "invalid_grant") {
              throw new Error(`Invalid grant. Please re-authenticate. ${errorData.error.response.data.error_description}`);
            }

            throw new Error(`Server error: ${res.statusText}`);
          }
          throw new Error(`Unexpected error: ${res.statusText}`);
        }

        const data = await res.json();
        setFolders(data);
        setError(null); // Clear error if the fetch is successful
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Set the error message to state
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchFolders();
  }, []);
  useEffect(() => {
    // Check if the user has visited the home page before
    const hasVisitedHome = localStorage.getItem("user");

    // If the user has not visited, redirect to login
    if (!hasVisitedHome) {
      router.push("/login");
    } else {
      // If the user has visited, mark it as true
      localStorage.setItem("hasVisitedHome", "true");
    }
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Navbar uname="Sanidhya Tulsinandan" />
      <h1 className="text-2xl font-bold mb-4 mt-12">
        JobsWorthy Students Folder List
      </h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-3/5 p-4 border border-gray-300 text-left">
              Folder Name
            </th>
            <th className="w-1/5 p-4 border border-gray-300 text-left">
              Folder Link
            </th>
            <th className="w-1/5 p-4 border border-gray-300 text-left">
              PortFolio Link
            </th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <p style={{ color: "red" }}>{error}</p> 
          ) : (
            <>
              {folders.map((folder) => (
                <tr key={folder.id}>
                  <td className="p-4 border border-gray-300">{folder.name}</td>
                  <td className="p-4 border border-gray-300">
                    <a
                      href={`https://drive.google.com/drive/folders/${folder.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Open Folder
                    </a>
                  </td>
                  <td className="p-4 border border-gray-300">
                    <Link
                      href={`/${folder.name}?id=${folder.id}`}
                      className="text-[#40348C]"
                    >
                      PortFolio Link
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
