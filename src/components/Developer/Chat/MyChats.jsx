import { Avatar, Box, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ChatLoading from "./ChatLoading";
function MyChats() {
  const {
    chats,
    setChats,
    loggedDeveloper,
    selectedChat,
    setSelectedChat,
    setNotification,
    notification,
  } = useStateContext();
  const toast = useToast();
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetcChat = async () => {
      try {
        const id = loggedDeveloper.user._id;
        const { data } = await axios.post(
          "/get_full_chat",
          { id },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            // eslint-disable-next-line comma-dangle
          }
        );
        setChats(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    fetcChat();
    return () => {
      setChats("");
    };
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      className="bg-gray-800"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "28px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        {/* <Button
          display="flex"
          bg={"blue.800"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button> */}
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                  setNotification(0);
                }}
                cursor="pointer"
                bg={selectedChat === chat ? "#111827" : "#374151"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {" "}
                <div className="flex justify-between">
                  <div className="flex">
                    <Avatar
                      mt="5px"
                      mr={1}
                      size="sm"
                      name={chat.project.name}
                      // src={m.sender.imgPath}
                    />
                    <div>
                      <Text>{chat.project.name}</Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          <b>{chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </Text>
                      )}
                    </div>
                  </div>
                  {selectedChat !== chat ? (
                    <div className=" bg-gray-900 rounded-full h-fit w-fit p-1">
                      {notification}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
