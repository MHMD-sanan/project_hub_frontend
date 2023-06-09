import { Box } from "@chakra-ui/react";
import React from "react";
import {useStateContext} from "../../../contexts/ContextProvider";
import SingleChat from "./SingleChat";

function ChatBox({fetchAgain, setFetchAgain}) {
  const { selectedChat } = useStateContext();
  return (
    <>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p={3}
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        className="bg-gray-800"
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </>
  );
}

export default ChatBox;
