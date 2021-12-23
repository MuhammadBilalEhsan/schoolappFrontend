import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
    p: 4,
    minWidth: 300,
    maxWidth: 400,
    maxHeight: 500,
    overflowY: "auto"
};

export default function MuiModal({ setRecieverID, setRecieverName, setConversationID }) {
    const users = useSelector(state => state.usersReducer.users)
    // const users = []
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const dispatch = useDispatch();

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
                {/* <ListItemIcon> */}
                {/* <GoPlus color="#fff" /> */}
                {/* </ListItemIcon> */}
                {/* <ListItemText primary="New Conversation" /> */}
                Conversation
            </Button>
            {/* <ListItem button
                onClick={handleOpen}
                sx={{
                    color: "#fff",
                    backgroundColor: "darkgreen",
                    "&:hover": { backgroundColor: "#014201", },
                    borderRadius: 1,
                    boxShadow: 5,
                    mb: 2
                }}>
                <ListItemIcon>
                    <GoPlus color="#fff" />
                </ListItemIcon>
                <ListItemText primary="New Conversation" />
            </ListItem> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        users?.length > 0 ?
                            users?.map((user, ind) => {
                                return (
                                    <Box
                                        key={ind} display="flex"
                                        justifyContent="space-around"
                                        alignItems="center" py={1} mb={1}
                                        border="3px solid #033c030d "
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
