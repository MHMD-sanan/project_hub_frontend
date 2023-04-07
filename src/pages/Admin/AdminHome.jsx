import React, { useEffect, useState } from "react";
import { IoPeople, IoCart } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { Navbar, Sidebar, Footer } from "../../components/Admin";
import { useStateContext } from "../../contexts/ContextProvider";
import StatusPieChart from "../../components/Admin/StatusPieChart";
import { Spinner, useToast } from "@chakra-ui/react";
import axios from "../../api/admin";
const AdminHome = () => {
  const { activeMenu } = useStateContext();
  const toast = useToast();
  const [dashboard, setDashboard] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDatas = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/home");
        setDashboard(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      }
    };
    getDatas();
  }, []);

  return (
    <div className="flex relative dark:bg-main-dark-bg h-screen">
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
        {/* page content */}
        <div className="">
          {loading ? (
            <div className="flex">
              <Spinner
                size="xl"
                w={28}
                h={28}
                alignSelf="center"
                margin="auto"
                color="blue.500"
              />
            </div>
          ) : (
            <div className="mt-12">
              <div className="mx-4 gap-4 md:flex">
                <BoxWrapper>
                  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                  </div>
                  <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">
                      Total Developers
                    </span>
                    <div className="flex items-center">
                      <strong className="text-xl text-gray-700 font-semibold">
                        {dashboard?.developersCount}
                      </strong>
                    </div>
                  </div>
                </BoxWrapper>
                <BoxWrapper>
                  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <GrUserManager className="text-2xl text-white" />
                  </div>
                  <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">
                      Total Team Leads
                    </span>
                    <div className="flex items-center">
                      <strong className="text-xl text-gray-700 font-semibold">
                        3
                      </strong>
                    </div>
                  </div>
                </BoxWrapper>
                <BoxWrapper>
                  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                    <IoCart className="text-2xl text-white" />
                  </div>
                  <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">
                      Total Projects
                    </span>
                    <div className="flex items-center">
                      <strong className="text-xl text-gray-700 font-semibold">
                        {dashboard?.projectsCount}
                      </strong>
                    </div>
                  </div>
                </BoxWrapper>
              </div>
              <StatusPieChart dashboard={dashboard} />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};
function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-lg p-4 flex-1 flex items-center my-2">
      {children}
    </div>
  );
}
export default AdminHome;
