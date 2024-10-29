import { useState, useRef } from "react";

import DefaultScreen from "./components/default-screen";
import AddProject from "./components/add-project";
import SideBar from "./components/side-bar";
import ProjectTasks from "./components/project-tasks";

//const projectTitles = projects.map((project) => project.Title);
//let projectSave = false;

function App() {
  /*const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });*/

  const [addProjClick, setAddProjClick] = useState(undefined);
  const [newProject, setNewProject] = useState([]);
  const [viewProject, setViewProject] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [viewTasks, setViewTasks] = useState(false);
  const viewProj = useRef();
  //const newProjectList = useRef();

  // const newProjectTitles = newProject.map((project) => project.Title);
  //let newProjectVal, newProjectTitles;

  /*if (newProjectList.current) {
    newProjectVal = newProjectList.current.getProjects();
    console.log("New Project List: ", newProjectVal);
    newProjectTitles = newProjectVal.map((project) => project.Title);
  }*/
  function handleClearTask(task) {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask !== task));
  }

  function handleAddTask(task) {
    setTasks((prevTasks) => [...prevTasks, task]);
    console.log("Tasks: ", tasks);
    setViewTasks(true);
  }
  function handleAddProjectClick() {
    setAddProjClick(null);
    /* setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: null };
    });*/
  }

  /* let content;
  if (projectsState.selectedProjectId === null) {
    content = <AddProject />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <DefaultScreen onCreateNewProject={handleAddProjectClick} />;
  }*/

  let content, viewP;

  if (addProjClick === null) {
    content = (
      <AddProject
        onSaveProject={handleSaveProject}
        onCancelProject={handleOnCancelProject}
      />
    );
  } else if (addProjClick === undefined) {
    content = <DefaultScreen onCreateNewProject={handleAddProjectClick} />;
  } else if (
    !isNaN(addProjClick) &&
    addProjClick !== null &&
    addProjClick !== undefined
  ) {
    viewP = newProject.filter((project) => project.Id === addProjClick);
    const proj = viewP[0];
    content = (
      <ProjectTasks
        project={proj}
        onProjectDelete={handleProjectDelete}
        onAddTask={handleAddTask}
        onClearTask={handleClearTask}
        taskList={tasks}
        displayTask={viewTasks}
      />
    );
  }

  function handleSaveProject(tit, desc, date) {
    const projectId = Math.random();
    setNewProject((prevProjectList) => [
      ...prevProjectList,
      {
        Id: projectId,
        Title: tit,
        Descriptipn: desc,
        DueDate: date,
      },
    ]);
    //alert("Your project is saved");

    //inputTitle.current.value = "";
    //inputDescription.current.value = "";
    //inputDueDate.current.value = "";

    /*console.log("App new project list:", newProject);
    if (newProjectList.current) {
      newProjectVal = newProjectList.current.getProjects();
      console.log("New Project List: ", newProjectVal);
      newProjectTitles = newProjectVal.map((project) => project.Title);
    }*/

    //setProjectSave(true);
    setAddProjClick(projectId);
    //setIsVisible(false);
  }
  console.log("New proj list ", newProject);

  function handleOnCancelProject() {
    setAddProjClick(undefined);
  }

  function handleOnViewProject(viewProjectId) {
    console.log("handleOnViewProject hit", viewProjectId);
    //viewProj.current = newProject.find((project) => project.Id === viewProjectId);
    //console.log("viewProject", viewProject.current);
    setAddProjClick(viewProjectId);
    //setViewProject(null);

    //setProjectSave(true);
  }

  function handleProjectDelete(projId) {
    setNewProject((prevProjectList) =>
      prevProjectList.filter((project) => project.Id !== projId)
    );
    setAddProjClick(undefined);
    console.log("NewProjectList:", newProject);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onAddProject={handleAddProjectClick}
        OnViewProject={handleOnViewProject}
        projects={newProject}
      />
      {content}
      {/*{!addProjClick && (
        <DefaultScreen onCreateNewProject={handleAddProjectClick} />
      )}
      {addProjClick && <AddProject onSaveProject={handleSaveProject} />}
      {projectSave && <AddProject />}*/}
    </main>
  );
}

export default App;
