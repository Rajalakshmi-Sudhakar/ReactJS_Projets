import { useState } from "react";

export default function SideBar({ onAddProject, projects, OnViewProject }) {
  // const [viewProject, setViewProject] = useState(false);

  /* function handleViewProject(title) {
    setViewProject(true);
  }*/

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>

      <div>
        <button
          className="px-4 py-2 text-xs md:text-base rounded-md text-stone-400 bg-stone-700 hover:bg-stone-600 hover:text-stone-100"
          onClick={onAddProject}
        >
          + Add Projects
        </button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => (
          <li key={project.Id}>
            <button
              onClick={() => OnViewProject(project.Id)}
              className="w-full text-left px-2 py-1 rouded-sm my-1 text-stone-400 hover:text-stone-800"
            >
              {project.Title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
