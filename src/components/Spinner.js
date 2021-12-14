import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

function Spinner() {
    return (
        <div>
            <Backdrop
                sx={{ color: 'green', backgroundColor: "#fff" }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Spinner