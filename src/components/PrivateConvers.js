import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SendingMessageInputComp from "./SendingMessageInputComp";
import SubSpinner from "./SubSpinner";
import { useDispatch, useSelector } from "react-redux";
import { currentConversationRedux } from "../redux/actions";
import MuiSnacks from "./MuiSnacks";
import axios from "axios";
import appSetting from "../appSetting/appSetting";
import moment from "moment";
import { socket } from "../App";

const PrivateConversation = ({
  curUser,
  id,
  allConversationsArray,
  recieverID,
  recieverName,
}) => {
  const LS = JSON.parse(localStorage.getItem("me"));
  const curConversation = useSelector(
    (state) => state.usersReducer.currentConversation
  );
  // const [recieversIDs, setRecieversIDs] = useState([])
  const [currentConversation, setCurrentConversation] = useState({});
  const [openSnack, setOpenSnack] = useState("");
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(true);
  // const history = useHistory()
  const dispatch = useDispatch();
  // ngrok

  const { _id, fname, lname } = curUser || {};
  const sendMsgFunc = async () => {
    try {
      const newMessage = message.trim();

      if (newMessage) {
        const name = `${fname} ${lname}`;
        let time = moment().format("hh:mm:ss A");
        const messageObj = {
          senderID: _id,
          senderName: name,
          time,
          message: newMessage,
          // recieverID: recieverObject?._id ? recieverObject?._id :
          //     curUser?._id === currentConversation?.user1ID ?
          //         currentConversation?.user2ID : currentConversation?.user1ID,
          recieverID,
          recieverName,
          // recieverName: `${recieverObject?.fname} ${recieverObject?.lname}`,
          // curUser?._id === currentConversation?.user1ID ?
          //     currentConversation?.user2ID : currentConversation?.user1ID
          _id: id ? id : null,
        };
        // console.log("MsgObj", messageObj)
        const res = await axios.post(
          `${appSetting.severHostedUrl}/user/sendmsg`,
          messageObj,
          { headers: { Authentication: `Bearer ${LS?.token}` } }
        );
        if (res) {
          if (res.data.message) {
            setCurrentConversation(res.data.conversation);
            socket.emit("changeInConversation", res.data.conversation);
            setOpenSnack(res.data.message);
            setSeverity("success");
          } else {
            setOpenSnack(res.data.error);
            setSeverity("error");
          }
          setMessage("");
        }
      } else {
        setOpenSnack("write something");
        setSeverity("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const findCurrentConversation = allConversationsArray?.find(
      (convers) => convers._id === id
    );
    // console.log("allConversationsArray", allConversationsArray)
    dispatch(currentConversationRedux(findCurrentConversation));
    setCurrentConversation(findCurrentConversation);
    setSpinner(false);
    // const findIDs = allConversationsArray?.map(con => {
    //     if (curUser?._id === con.user1ID) {
    //         return con.user2ID
    //     } else {
    //         return con.user2ID
    //     }

    // })
    // setRecieversIDs(findIDs)
  }, [id]);
  // useEffect(() => {
  //     const findCurrentConversation = allConversationsArray?.find(convers => convers._id === id)
  //     dispatch(currentConversationRedux(findCurrentConversation))
  //     setCurrentConversation(findCurrentConversation)
  //     setSpinner(false)
  // }, [])
  useEffect(() => {
    setCurrentConversation(curConversation);
  }, [curConversation, allConversationsArray]);

  return (
    <Box
      mx="auto"
      sx={{ overflowY: "auto", boxShadow: 3 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      mt={1}
      // mt={5}
      sx={{ backgroundColor: "#fff" }}
    >
      {openSnack ? (
        <MuiSnacks
          openSnack={openSnack}
          severity={severity}
          text={openSnack}
          setOpenSnack={setOpenSnack}
        />
      ) : (
        ""
      )}

      <Box
        width="100%"
        display="flex"
        flexDirection={"column"}
        // minHeight="100%"
        sx={{ height: { xs: `calc(100vh - ${137}px)` } }}
        px={1.5}
      >
        <Box
          width="100%"
          flexGrow={1}
          pt={1}
          display="flex"
          flexDirection="column"
        >
          {spinner ? (
            <SubSpinner />
          ) : currentConversation?.chat.length > 0 ? (
            currentConversation?.chat.map((messageObj, ind) => {
              return (
                // {user1ID, user1Name, user2ID, user2Name}
                <PersonalMessageBox
                  key={ind}
                  bgColor={
                    curUser?._id === messageObj?.senderID ? "darkgreen" : "#fff"
                  }
                  textColor={
                    curUser?._id === messageObj?.senderID ? "#fff" : "darkgreen"
                  }
                  position={
                    curUser?._id === messageObj?.senderID
                      ? "flex-end"
                      : "flex-start"
                  }
                  message={messageObj.message}
                  time={messageObj.time}
                />
              );
            })
          ) : (
            <Box pt={5} width="100%" textAlign="center" flexGrow={1}>
              <Typography variant="subtitle1" color="darkgreen">
                Currently No Chats
              </Typography>
            </Box>
          )}
        </Box>
        <SendingMessageInputComp
          name="message"
          autoFocus={true}
          value={message}
          setValue={setMessage}
          type="text"
          placeholder={`Write ...`}
          color="success"
          submitFunc={sendMsgFunc}
          userName={curUser?.fname[0]}
        />
      </Box>
    </Box>
  );
};

const PersonalMessageBox = ({
  bgColor,
  textColor,
  position,
  time,
  message,
}) => {
  return (
    <Box mb={1} sx={{ display: "flex", justifyContent: position }}>
      <Box>
        <Box
          maxWidth="350px"
          width="fit-content"
          // minWidth="1px"
          border="1px solid darkgreen"
          borderRadius={0.4}
          mb={0.5}
          p="8px 16px"
          sx={{
            backgroundColor: bgColor,
            color: textColor,
            alignSelf: position,
          }}
        >
          {message}
        </Box>
        <span style={{ fontSize: "12px" }}>{time}</span>
      </Box>
    </Box>
  );
};

export default PrivateConversation;
