import { Box } from "@chakra-ui/react";
import Navbar from "../../../components/Developer/Navbar";
import SideDrawer from "../../../components/Developer/Chat/SideDrawer";
import MyChats from "../../../components/Developer/Chat/MyChats";
import ChatBox from "../../../components/Developer/Chat/ChatBox";
import { useEffect, useState } from "react";
import {useStateContext} from "../../../contexts/ContextProvider.js"
function Chat() {
  const { setSelectedChat } = useStateContext();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    return () => {
      setSelectedChat(null);
    }
  }, [])
  

  return (
    <div>
      <Navbar />
      <div className="mt-16 bg-gray-900 h-screen flex justify-center">
        <div className="text-white w-full">
          {/* <SideDrawer /> */}
          <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            h="91.5vh"
            p="10px"
          >
            <MyChats fetchAgain={fetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Chat;
