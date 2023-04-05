/* eslint-disable comma-dangle */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";
import Board from "../../../components/Developer/Board/Board";
import Footer from "../../../components/Developer/Footer";
import Navbar from "../../../components/Developer/Navbar";
import Editable from "../../../components/Developer/Editabled/Editable";
import { setBoard } from "../../../redux/developer/KanbanBoard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useStateContext } from "../../../contexts/ContextProvider";
import "./Single.css";
import { Spinner, useToast } from "@chakra-ui/react";

function SinlgleProject() {
  const axios = useAxiosPrivate();
  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });
  const dispatch = useDispatch();
  const { role } = useStateContext();

  const boards = useSelector((state) => {
    return state.kanbanBoard.value;
  });
  const id = useSelector((state) => {
    return state.singleProject.value;
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // useEffect(() => {
  //   const getKanban = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.post(
  //         "/view_singleProject",
  //         { id },
  //         {
  //           headers: { "Content-Type": "application/json" },
  //           withCredentials: true,
  //           // eslint-disable-next-line comma-dangle
  //         }
  //       );
  //       dispatch(
  //         setBoard({
  //           board: data.kanban.boards,
  //           // eslint-disable-next-line comma-dangle
  //         })
  //       );
  //       setLoading(false);
  //     } catch (error) {
  //       toast({
  //         title: 'Something went wrong',
  //         status: "error",
  //         duration: 5000,
  //         position: "top-right",
  //         isClosable: true,
  //       })
  //     }
  //   }
  //   getKanban();
  // }, []);

  const addboardHandler = async (name, privileges) => {
    const { data } = await axios.patch("/add_board", { name, id, privileges });
    dispatch(
      setBoard({
        board: data.kanban.boards,
        // eslint-disable-next-line comma-dangle
      })
    );
  };

  const removeBoard = async (taskId) => {
    try {
      const { data } = await axios.patch("/delete_board", { taskId, id });
      dispatch(
        setBoard({
          board: data.kanban.boards,
          // eslint-disable-next-line comma-dangle
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const addCard = async (boardId, title) => {
    try {
      const { data } = await axios.patch("/add_card", { boardId, title, id });
      dispatch(
        setBoard({
          board: data.kanban.boards,
          // eslint-disable-next-line comma-dangle
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const removeCard = async (boardId, cardId) => {
    try {
      const { data } = await axios.patch("/delete_card", {
        boardId,
        cardId,
        id,
      });
      dispatch(
        setBoard({
          board: data.kanban.boards,
          // eslint-disable-next-line comma-dangle
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const updateCard = async (bid, cid, card) => {
    try {
      const { data } = await axios.patch("/update_card", {
        bid,
        cid,
        card,
        id,
      });
      dispatch(
        setBoard({
          board: data.kanban.boards,
          // eslint-disable-next-line comma-dangle
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const dragEnded = async (bid, cid) => {
    const s_boardIndex = boards.findIndex((item) => item._id === bid);
    if (s_boardIndex < 0) return;

    const s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item._id === cid
    );
    if (s_cardIndex < 0) return;

    const t_boardIndex = boards.findIndex(
      (item) => item._id === targetCard.bid
    );
    if (t_boardIndex < 0) return;

    const t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item._id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = cloneDeep(boards);
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    dispatch(
      setBoard({
        board: tempBoards,
        // eslint-disable-next-line comma-dangle
      })
    );
    setTargetCard({
      bid: "",
      cid: "",
    });
    await axios.patch("/save_drag", { id, tempBoards });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="app mt-16 bg-gray-900">
        {loading ? (
          <Spinner
            size="xl"
            w={28}
            h={28}
            alignSelf="center"
            margin="auto"
            color="blue.500"
          />
        ) : (
          <>
            <h1 className="text-white font-bold text-2xl flex justify-center mt-10">
              Mobile App Development
            </h1>
            <div className="app_boards_container custom-scroll">
              <div className="app_boards">
                {boards.map((item, index) => (
                  <div className="flex flex-col">
                    <Board
                      key={index}
                      board={item}
                      addCard={addCard}
                      removeBoard={() => removeBoard(item._id)}
                      removeCard={removeCard}
                      dragEnded={dragEnded}
                      dragEntered={dragEntered}
                      updateCard={updateCard}
                    />
                  </div>
                ))}
                {role === "Team Lead" ? (
                  <div className="app_boards_last">
                    <Editable
                      displayClass="app_boards_add-board"
                      editClass="app_boards_add-board_edit"
                      placeholder="Enter Board Name"
                      text="Add Board"
                      buttonText="Add Board"
                      onSubmit={addboardHandler}
                      checkbox
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SinlgleProject;
