import React, { useState, useContext } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Avatar, IconButton } from "@material-ui/core";
import { AuthContext } from "../../../../../contexts/AuthContextProvider";
import { db, firebase, auth, logout } from "../../../../../firebase/base";
import "./../../RoomsTab.css";
import { useHistory } from "react-router-dom";

const SideBarNav = () => {
  const [openMore, setOpenMore] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const signOut = async () => {
    await db.collection("users").doc(currentUser.uid).update({
      active: false,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    });
    logout();
  };

  return (
    <>
      <div
        className={`backdrop ${openMore ? "open" : null}`}
        onClick={() => setOpenMore(!openMore)}></div>
      <div className='sidebar-header'>
        <div className='sidebar-header__user-data'>
          <Avatar src={currentUser?.photo} />
          <p>{currentUser?.name}</p>
          {/* <p>{currentUser?.nickName}</p> */}
        </div>
        <div className='sidebar-header__nav-section'>
          {/* <Link to='/dashboard/users'> */}
          <IconButton
            title='new chat'
            onClick={() => history.push("/dashboard/users")}>
            <ChatIcon />
          </IconButton>
          <IconButton title='log out' onClick={signOut}>
            <ExitToAppIcon />
          </IconButton>
          {/* </Link> */}
          {/* <div className='model'>
            <IconButton title='menu' onClick={() => setOpenMore(!openMore)}>
              <MoreVertIcon />
            </IconButton>
            <nav className={`dropdown-model ${openMore ? "open" : null}`}>
              <ul className='dropdown-model__items'>
                <li className='dropdown-model__item'>
                  <button className='dropdown__btn' onClick={() => null}>
                    <span>New group</span>
                    <GroupAddIcon />
                  </button>
                </li>
                <li className='dropdown-model__item'>
                  <button className='dropdown__btn' onClick={() => null}>
                    <span>Profile</span>
                    <PersonIcon />
                  </button>
                </li>
                <li className='dropdown-model__item'>
                  <button className='dropdown__btn' onClick={signOut}>
                    <span>Log out</span>
                    <ExitToAppIcon />
                  </button>
                </li>
              </ul>
            </nav>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
