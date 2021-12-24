import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import defaultDP from "../../images/defaultDP.jpg"
import { GoPlus } from 'react-icons/go';
import {
    useSelector,
    //  useDispatch 
} from 'react-redux';
// import { currentConversationRedux } from '../../redux/actions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 1,
    boxShadow: 24,
    px: 2,
    py: 4,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: 500,
    overflowY: "auto"
};

export default function MuiModal({
    curUser,
    setRecieverID,
    setRecieverName,
    setConversationID,
    allConversationsArray
}) {
    const users = useSelector(state => state.usersReducer.users)
    // const allConversations = useSelector(state => state.usersReducer.allConversations)
    // const users = []
    const [open, setOpen] = useState(false);
    const [filterUsers, setFilterUsers] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        let conversations = [];
        allConversationsArray.map((conversation) =>
            conversations.push(curUser?._id === conversation.user1ID ? conversation.user2ID : conversation.user1ID)
        );
        let newUsers = users?.filter((user) => !conversations.includes(user._id));
        setFilterUsers(newUsers)
    }, [open])
    return (
        <div>
            <Button
                onClick={handleOpen}
                fullWidth
                startIcon={<GoPlus color="#fff" />}
                sx={{
                    color: "#fff",
                    backgroundColor: "darkgreen",
                    "&:hover": { backgroundColor: "#014201", },
                    borderRadius: 1,
                    boxShadow: 5,
                    py: 1.5
                }}
            >
                Conversation
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        filterUsers?.length > 0 ?
                            filterUsers?.map((user, ind) => {
                                return (
                                    <Box
                                        key={ind} display="flex"
                                        justifyContent="space-around"
                                        alignItems="center" py={1} mb={1}
                                        border="3px solid #033c030d"
                                        boxShadow={4}
                                        borderRadius={1}
                                        sx={{
                                            cursor: "pointer",
                                            "&:hover": { backgroundColor: "#00640021" }
                                        }}
                                        onClick={
                                            () => {
                                                setRecieverID(user._id)
                                                setRecieverName(`${user.fname} ${user.lname}`)
                                                setConversationID("")
                                                handleClose()
                                            }
                                        }
                                    >
                                        <Avatar
                                            alt={user.fname}
                                            src={user.dp ? user.dp : defaultDP}
                                            sx={{ border: "1px solid #014201" }}
                                        />
                                        <Typography
                                            variant="subtitle1" color="darkgreen"
                                        >
                                            <b>
                                                {`${user.fname} ${user.lname}`}
                                            </b>
                                        </Typography>
                                        <Typography
                                            variant="subtitle1" color="darkgreen"
                                        >
                                            {user.roll}
                                        </Typography>
                                    </Box>
                                )
                            })
                            : <Typography variant="h6" color="black"
                                sx={{ m: "0 auto" }}
                            >
                                Currently No Users
                            </Typography>
                    }
                </Box>
            </Modal>
        </div >
    );
}
