import React, { useContext, useEffect, useState } from "react";
import "./User.scss";
import { Avatar } from "@material-ui/core";
import { db } from "../../../firebase/base";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebarView } from "../../../actions/roomsActions";

const User = ({ userData }) => {
  const [chatRoom, setChatRoom] = useState("");
  const { rooms, windowWidth, displaySidebar } = useSelector(
    (state) => state.roomsReducer
  );
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const redirectToRoom = async () => {
    if (windowWidth <= 545 && !displaySidebar)
      dispatch(toggleSidebarView(true));

    if (chatRoom.id) {
      history.push(
        `/dashboard/${chatRoom.lastMessage !== null ? "chats" : "users"}/room/${
          chatRoom.id
        }`
      );
    } else {
      const newRoom = await db.collection("rooms").add({
        type: "private",
        lastMessageTime: null,
        lastMessageContent: null,
        members: [currentUser.uid, userData.uid],
        typingUsers: [],
      });
      history.push(`/dashboard/users/room/${newRoom.id}`);
    }
  };

  useEffect(() => {
    if (userData.id) {
      const chatRoomArr = rooms.filter(
        (room) =>
          room.type === "private" &&
          room.members.some((uid) => uid === userData.uid)
      );
      if (chatRoomArr.length > 0) {
        setChatRoom(chatRoomArr[0]);
      }
    }
  }, [userData]);

  return (
    <div>
      <button
        key={userData.id}
        className='user'
        onClick={() => redirectToRoom()}>
        <div className='user-avatar'>
          <Avatar src={userData?.photo} />
          {userData?.active && <div className='user-avatar--active'></div>}
        </div>
        <div className='user__info'>
          <div className='user__info__container'>
            <h2>{userData.name}</h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default User;
