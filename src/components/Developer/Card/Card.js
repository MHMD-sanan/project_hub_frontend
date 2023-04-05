/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { Clock, MoreHorizontal } from "react-feather";
import { useStateContext } from "../../../contexts/ContextProvider";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.scss";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { role } = useStateContext();

  const { title, date, _id } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    // eslint-disable-next-line no-shadow
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    // eslint-disable-next-line prefer-template
    return day + " " + month;
  };

  const dragStarted = (e, bid, cid) => {
    const ids = `${bid}:${cid}`;
    e.dataTransfer.setData("ids", ids);
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable={
          !!(role === "Team Lead" || props.privileges === role)
        }
        onDragEnd={() => props.dragEnded(props.boardId, _id)}
        onDragEnter={() => props.dragEntered(props.boardId, _id)}
        onClick={() => setShowModal(true)}
        onDragStart={(e) => dragStarted(e, props.boardId, _id)}
      >
        <div className="card_top">
          <div className="card_top_labels" />
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, _id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
