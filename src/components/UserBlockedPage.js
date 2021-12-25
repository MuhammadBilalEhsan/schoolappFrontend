import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '1px solid #000',
    textAlign: "center",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function UserBlockedPage() {

    return (
        <div>
            <Modal
                open={true}
            >
                <Box sx={style}>
                    <Typography variant="h4" color="red">
                        NO ENTRY... !!!
                    </Typography>
                    <Divider />
                    <Typography sx={{ mt: 2 }} variant="subtitle1">
                        You Can't do any Activity, <br />
                        You are Blocked by Admin.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
export default UserBlockedPage;