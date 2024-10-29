import { useRef } from "react";
import Modal from "./modal";

const AddProject = function AddProject({ onSaveProject, onCancelProject }) {
  //const [newProject, setNewProject] = useState(projectsList);
  const inputTitle = useRef();
  const inputDescription = useRef();
  const inputDueDate = useRef();
  const modal = useRef();

  /* useImperativeHandle(ref, () => ({
    getProjects: () => newProject,
  }));
*/
  function handleCancel() {
    inputTitle.current.value = "";
    inputDescription.current.value = "";
    inputDueDate.current.value = "";

    onCancelProject();
  }

  function handleSave() {
    if (
      inputTitle.current.value.trim === "" ||
      inputDescription.current.value === "" ||
      inputDueDate.current.value === ""
    ) {
      modal.current.open();
      return;
    }

    onSaveProject(
      inputTitle.current.value,
      inputDescription.current.value,
      inputDueDate.current.value
    );
  }

  /*function handleSave() {
    setNewProject((prevProjectList) => [
      ...prevProjectList,
      {
        Title: inputTitle.current.value,
        Descriptipn: inputDescription.current.value,
        DueDate: inputDueDate.current.value,
      },
    ]);
    alert("Your project is saved");
    onSaveProject(newProject);

    inputTitle.current.value = "";
    inputDescription.current.value = "";
    inputDueDate.current.value = "";
  }*/

  //console.log(newProject);
  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4 ">
          Invalid Input
        </h2>
        <p className="text-stone-700 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-700 mb-4">
          Please make sure you provide valid input for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4 ">
          <button
            className="text-stone-800 hover:text-stone-950"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className=" bg-stone-800 text-stone-50 py-2 px-6 rounded-md hover:bg-stone-950"
            onClick={handleSave}
          >
            Save
          </button>
        </menu>

        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <p className="flex flex-col gap-1 my-4">
            <label className="text-sm uppercase text-stone-500 font-bold ">
              Title
            </label>
            <input
              className="w-full p-1 border-b-2 border-stone-300 rounded-sm bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="text"
              placeholder="Add Project Title Here"
              ref={inputTitle}
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-sm uppercase text-stone-500 font-bold ">
              Description
            </label>
            <textarea
              className="w-full p-1 border-b-2 border-stone-300 rounded-sm bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="text"
              placeholder="Enter Project Description Here"
              ref={inputDescription}
            />
          </p>
          <p className="flex flex-col gap-1 my-4">
            <label className="text-sm uppercase text-stone-500 font-bold ">
              Due-Date
            </label>
            <input
              className="w-full p-1 border-b-2 border-stone-300 rounded-sm bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
              type="date"
              ref={inputDueDate}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default AddProject;
