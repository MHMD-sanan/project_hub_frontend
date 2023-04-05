/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import cloneDeep from "lodash.clonedeep";
import Card from "../Card/Card";
import Editable from "../Editabled/Editable";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Dropdown from "../Dropdown/Dropdown";
import { setBoard } from "../../../redux/developer/KanbanBoard";
import { useStateContext } from "../../../contexts/ContextProvider";
import "./Board.css";
import { useToast } from "@chakra-ui/react";

function Board(props) {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const { role } = useStateContext();
  const toast = useToast();

  const boards = useSelector((state) => {
    return state.kanbanBoard.value;
  });
  const id = useSelector((state) => {
    return state.singleProject.value;
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [targetBid, setTargetBid] = useState("");

  const dragStarted = (e, bid) => {
    e.dataTransfer.setData("bid", bid);
  };

  const draggingOver = (e, bid) => {
    e.preventDefault();
    setTargetBid(bid);
  };
  const dragDropped = async (e) => {
    e.preventDefault();
    const values = e.dataTransfer.getData("ids");
    const ids = values.split(":");
    const bid = ids[0];
    const cid = ids[1];
    const tempBoards = cloneDeep(boards);
    let s_boardIndex = boards.findIndex((item) => item._id === bid);
    if (s_boardIndex < 0) {
      const sbid = e.dataTransfer.getData("bid");
      s_boardIndex = boards.findIndex((item) => item._id === sbid);
      if (s_boardIndex < 0) return;
      const t_boardIndex = boards.findIndex((item) => item._id === targetBid);
      if (t_boardIndex < 0) return;
      const sourceBoard = tempBoards[s_boardIndex];
      tempBoards.splice(s_boardIndex, 1);
      tempBoards.splice(t_boardIndex, 0, sourceBoard);
    } else {
      const s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
        (item) => item._id === cid
      );
      if (s_cardIndex < 0) return;

      const t_boardIndex = boards.findIndex((item) => item._id === targetBid);
      if (t_boardIndex < 0) return;

      if (props.board?.cards?.length === 0) {
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[t_boardIndex].cards.splice(0, 0, sourceCard);
      }
    }
    dispatch(
      setBoard({
        board: tempBoards,
        // eslint-disable-next-line comma-dangle
      })
    );
    await axios.patch("/save_drag", { id, tempBoards });

    setTargetBid("");
  };

  const updateBoard =async (value, privileges) => {
    try {
      
      const boardId=props.board._id
      const { data } = await axios.patch("/update_board", { value, privileges, boardId, id });
      dispatch(
        setBoard({
          board: data.kanban.boards,
          // eslint-disable-next-line comma-dangle
        })
      );
    } catch (error) {
      toast({
        title: 'Something went wrong',
        status: "error",
        duration: 5000,
        position:"bottom-left",
        isClosable: true,
      })
    }
  };

  return (
    <div
      className="board"
      draggable // to make a div graggable
      onDragStart={(e) => dragStarted(e, props.board._id)}
      onDragOver={(e) => draggingOver(e, props.board._id)}
      onDrop={(e) => dragDropped(e)} // to do after dropping is done
    >
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div
        className="board_cards custom-scroll"
        onDragOver={(e) => draggingOver(e, props.board._id)}
      >
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board._id}
            removeCard={props.removeCard}
            dragEnded={props.dragEnded}
            dragEntered={props.dragEntered}
            updateCard={props.updateCard}
            privileges={props.board.privileges}
          />
        ))}
        {role === "Team Lead" ? (
          <>
            <Editable
              text="+ Add Card"
              placeholder="Enter Card Title"
              displayClass="board_add-card"
              editClass="board_add-card_edit"
              onSubmit={(value) => props.addCard(props.board?._id, value)}
            />
            <Editable
              displayClass="board_add-card"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Edit Board"
              buttonText="Save Changes"
              onSubmit={updateBoard}
              checkbox
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Board;
