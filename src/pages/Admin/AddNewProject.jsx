import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navbar, Sidebar, Footer } from "../../components/Admin";
import axios from "../../api/admin";

function AddNewProject() {
  const { activeMenu } = useStateContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState("");
  const [api, setApi] = useState("");
  const [dataBase, setDataBase] = useState("");
  const [module, setModule] = useState("");

  const generateError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const handleSubmit = async () => {
    const projectData = new FormData();
    projectData.append("proName", name);
    projectData.append("proDes", des);
    projectData.append("proDate", date);
    projectData.append("apiDocumentation", api);
    projectData.append("databaseDesign", dataBase);
    projectData.append("module", module);
    try {
      const { data } = await axios.post("/addProjects", projectData);
      if (data.status) {
        navigate("/admin/projects");
      } else {
        generateError(data.message);
      }
    } catch (error) {
      generateError(error.message);
    }
  };

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondarSay-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>

        <div className="mt-10 h-screen">
          <div className="relative flex flex-col justify-center  overflow-hidden">
            <div className="w-full h-full p-6 m-auto bg-white rounded-md shadow-md md:w-2/3">
              <h1 className="text-3xl font-semibold text-center text-blue-700">
                Add New Project
              </h1>
              <form className="w-full">
                <div className="flex items-center border-b py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Project name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Project description"
                    defaultValue={des}
                    onChange={(e) => setDes(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Prototype Link"
                    defaultValue={des}
                    onChange={(e) => setDes(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <label htmlFor="">API documentation</label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="file"
                    defaultValue={des}
                    onChange={(e) => setApi(e.target.files[0])}
                    required
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <label htmlFor="">Database Design</label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="file"
                    defaultValue={des}
                    onChange={(e) => setDataBase(e.target.files[0])}
                    required
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <label htmlFor="">Project Modules</label>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="file"
                    defaultValue={des}
                    onChange={(e) => setModule(e.target.files[0])}
                    required
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <input
                    className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="bg-blue-800 text-white p-3 rounded-md hover:drop-shadow-xl hover:bg-blue-900"
                    onClick={handleSubmit}
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  );
}

export default AddNewProject;
