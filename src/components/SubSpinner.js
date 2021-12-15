import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function SubSpinner() {
    return (
        <div>
            <Box
                sx={{ color: 'green', backgroundColor: "#fff", width: "100%", height: "100%" }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Box>
        </div>
    );
}

export default SubSpinner