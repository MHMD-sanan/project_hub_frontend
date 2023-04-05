import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import RecordAudio from "./RecordAudio";

const ENDPONIT = "http://localhost:4000";
var socket, selectedChatCompare;

function SingleChat() {
  const { selectedChat, setSelectedChat, loggedDeveloper, setChats } =
    useStateContext();
  const axios = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [socketConnected, setSocketConnected] = useState(false);
  const id = loggedDeveloper.user._id;
  const [showImojiPicker, setShowImojiPicker] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/get_full_message/${selectedChat._id}`,
        { id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          // eslint-disable-next-line comma-dangle
        }
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          "/send_message",
          {
            id,
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            // eslint-disable-next-line comma-dangle
          }
        );
        setChats(data.chats);
        socket.emit("new message", data.message);
        setMessages([...messages, data.message]);
        socket.on("message recieved", (newMessageRecieved) => {
          if (
            !selectedChatCompare ||
            selectedChatCompare._id !== newMessageRecieved.chat._id
          ) {
            // give notifiction
          } else {
            setMessages([...messages, newMessageRecieved]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPONIT);
    socket.emit("setup", loggedDeveloper.user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //       // give notifiction
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const handleImojiSelect = (e) => {
    let message = newMessage;
    message += e.native;
    setNewMessage(message);
    setShowImojiPicker(!showImojiPicker);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              bg={"#111827"}
              _hover
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <></>
            ) : (
              <>{selectedChat.project.name} </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#111827"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                color="blue.500"
              />
            ) : (
              <div className="flex flex-col overflow-y-scroll">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              mt={3}
              display="flex"
            >
              <BsFillEmojiSmileFill
                className="mt-1 mx-2 text-4xl text-gray-700"
                onClick={() => setShowImojiPicker(!showImojiPicker)}
              />
              <div className="absolute -top-96 h-14">
                {showImojiPicker && (
                  <Picker
                    data={data}
                    previewPostion="none"
                    onEmojiSelect={handleImojiSelect}
                  />
                )}
              </div>
              <Input
                variant="filled"
                bg="#1f2937"
                placeholder="Enter a message"
                onChange={typingHandler}
                value={newMessage}
                _hover
              />
              <RecordAudio />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box>
          <Text fontSize="3xl" pb={3}>
            Click on a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
