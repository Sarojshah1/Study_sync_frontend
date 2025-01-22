import { useLocation } from "react-router-dom";

const ProjectOverview = () => {
    const { state } = useLocation();
    const { projectId, projectName } = state || {};
    
    return (
        <div>
            <h1>{projectName}</h1>
            <p>Project ID: {projectId}</p>
            {/* Render additional project details */}
        </div>
    );
};

export default ProjectOverview;
