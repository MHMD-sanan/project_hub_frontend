import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/admin";
import {
  Navbar,
  Sidebar,
  Footer,
  Header,
  Button,
} from "../../components/Admin";
import { useStateContext } from "../../contexts/ContextProvider";
import { Spinner } from "@chakra-ui/react";
import AddDeveloper from "../../components/Admin/AddDeveloper";

function Developers() {
  const { activeMenu, currentColor, developers, setDevelopers } =
    useStateContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const { data } = await axios.get("/get_all_developers");
      setDevelopers(data.developers);
    };
    getData();
    setLoading(false);
  }, []);

  const changeStatus = async (id) => {
    const { data } = await axios.patch("/updateUser", { id });
    setDevelopers(data.developers);
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

        <div className="h-screen mt-16">
          {loading ? (
            <div className="flex">
              <Spinner
                size="xxl"
                w={28}
                h={28}
                alignSelf="center"
                margin="auto"
                color="blue.500"
              />
            </div>
          ) : (
            <div className="md:m-10 p-2 md:p-10 bg-white rounded-3xl">
              <div className="flex justify-between">
                <Header title="Developers" />
                <Link to="/admin/add_developer">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Add Developer"
                    borderRadius="10px"
                    />
                  </Link>
                  <AddDeveloper/>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left dark:text-gray-400">
                    <thead className="text-xs uppercase text-gray-400 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          <p className="text-center">Developer Id</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <p className="text-center">Name</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <p className="text-center">Image</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <p className="text-center">Domain</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <p className="text-center">Email</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <p className="text-center">Status</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {developers.map((item) => (
                        <tr
                          key={item._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">{item._id}</td>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4">
                            <img src={item.imgPath} alt="" width="75px" />
                          </td>
                          <td className="px-6 py-4">{item.domain}</td>
                          <td className="px-6 py-4">{item.email}</td>
                          <td className="px-6 py-4">
                            {item.status ? (
                              <button
                                type="button"
                                onClick={() => changeStatus(item._id)}
                                className="bg-red-600 p-3 rounded-lg text-white"
                              >
                                block
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => changeStatus(item._id)}
                                className="bg-green-600 p-3 rounded-lg text-white"
                              >
                                unblock
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Developers;
