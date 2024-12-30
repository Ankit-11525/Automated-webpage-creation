import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Project = () => {
  const router = useRouter();
  const { uname, project } = router.query;
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    if (uname && project) {
      const fetchProjectData = async () => {
        const res = await fetch(`/api/get-file-content?folderName=${uname}&fileName=${project}.xlsx`);
        const data = await res.json();
        setProjectData(data);
      };

      fetchProjectData();
    }
  }, [uname, project]);

  return (
    <div>
      <h1>{project} Project</h1>
      <pre>{JSON.stringify(projectData, null, 2)}</pre>
    </div>
  );
};

export default Project;