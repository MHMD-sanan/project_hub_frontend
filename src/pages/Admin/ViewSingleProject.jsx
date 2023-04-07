import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navbar, Sidebar, Footer } from "../../components/Admin";
import { Button, useToast } from "@chakra-ui/react";
import axios from "../../api/admin";

function ViewSingleProject() {
  const {
    activeMenu,
    singleProject,
    developers,
    setDevelopers,
    selectedProject,
    setSingleProject,
  } = useStateContext();
  const [developer, setDeveloper] = useState();
  const [members, setMembers] = useState([]);
  const [teamLead, setTeamLead] = useState([]);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // use to show the developers list
  useEffect(() => {
    const setData = async () => {
      const { data } = await axios.get("/get_all_developers");
      setDevelopers(data.developers);
      const id = selectedProject;
      const res = await axios.post("/view_single_project", { id });
      setSingleProject(res.data.project);
      setMembers(res.data.project.team);
    };
    setData();
  }, []);

  const addDeveloper = async () => {
    const ids = {
      userId: developer,
      projectId: selectedProject,
    };
    try {
      const { data } = await axios.patch("/add_team", ids);
      if (data.status) {
        setMembers(data.project.team);
        toast({
          title: "Developer added successfully",
          status: 'success',
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } else {
        toast({
          title: "Developer already exist",
          status: 'error',
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const addTeamLead = async () => {
    const id = {
      id: teamLead,
      projectId: selectedProject,
    };
    const { data } = await axios.patch("/add_team_lead", id);
    setSingleProject(data.project);
  };

  const deleteDeveloper = async (id) => {
    const values = {
      id,
      projectId: selectedProject,
    };
    const { data } = await axios.patch("/delete_team_member", values);
    setMembers(data.project.team);
  };

  const updateStatus = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch("/update_project_status", { status, selectedProject });
      setSingleProject(data.project);
      setLoading(false);
      toast({
        title: "Status updated successfully",
        status: 'success',
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
  }

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
            <div className="w-full h-full p-6 m-auto bg-white rounded-md shadow-md md:w-4/5">
              <h1 className="text-3xl font-semibold text-center text-blue-700">
                {singleProject.name}
              </h1>
              <form className="w-full">
                <div className="flex items-center border-b py-2">
                  <input
                    className="bg-transparent border-none w-full mr-3 py-1 px-2"
                    type="text"
                    placeholder="Project name"
                    value={singleProject.name}
                  />
                </div>
                <div className="flex items-center border-b py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Project description"
                    value={singleProject.description}
                  />
                </div>

                <div className="flex flex-col border-b py-2 ">
                  {/* to select from developers */}
                  <div>
                    <select
                      className=" bg-white py-3"
                      name="developer"
                      onChange={(e) => setDeveloper(e.target.value)}
                    >
                      <option value="">Select developers</option>
                      {developers.map((item) => (
                        <option key={item?._id} value={item?._id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                    <Button onClick={addDeveloper} variant="solid" colorScheme="facebook" ml={2} isLoading={false}>Add</Button>
                    {/* <button
                      onClick={addDeveloper}
                      type="button"
                      className="bg-blue-700 py-1 px-2 rounded-lg text-white mx-2"
                    >
                      Add Developer
                    </button> */}
                  </div>
                  {/* to view each members */}
                  <div className="flex w-full flex-wrap">
                    {members
                      ? members.map((item) => (
                          // eslint-disable-next-line react/jsx-indent
                          <div
                            key={item._id}
                            className="bg-blue-800 h-fit w-fit shadow-lg rounded-full m-3"
                          >
                            <p className="px-4 py-2 text-white">
                              {item.developerId?.name}{" "}
                              <button
                                type="button"
                                onClick={
                                  () => deleteDeveloper(item.developerId?._id)
                                  // eslint-disable-next-line react/jsx-curly-newline
                                }
                              >
                                {" "}
                                <TiDeleteOutline />
                              </button>{" "}
                            </p>
                          </div>
                          // eslint-disable-next-line indent
                        ))
                      : ""}
                  </div>
                </div>

                <div className="flex items-center py-2">
                  <select
                    className="ml-2 bg-white py-3"
                    name="developer"
                    onChange={(e) => setTeamLead(e.target.value)}
                  >
                    <option value="">Select teamLead</option>
                    {members
                      ? members.map((item) => (
                          // eslint-disable-next-line react/jsx-indent
                          <option key={item?._id} value={item.developerId?._id}>
                            {item.developerId?.name}
                          </option>
                          // eslint-disable-next-line indent
                        ))
                      : ""}
                  </select>
                  <Button onClick={addTeamLead} variant="solid" colorScheme="facebook" ml={2} isLoading={false}>Add</Button>
                </div>
                {singleProject.teamLead ? (
                  <div className="flex w-full flex-wrap border-b">
                    <div className="bg-blue-800 h-fit w-fit shadow-lg rounded-full m-3">
                      <p className="px-4 py-2 text-white">
                        {singleProject.teamLead?.name}{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="mt-2">
                  <select
                    className=" bg-white py-3"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">{singleProject?.status}</option>
                    <option value="not started">not started</option>
                    <option value="started">started</option>
                    <option value="due">due</option>
                    <option value="completed">completed</option>
                  </select>
                  <Button onClick={updateStatus} variant="solid" colorScheme="facebook" ml={2} isLoading={loading}>Update status</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ViewSingleProject;
