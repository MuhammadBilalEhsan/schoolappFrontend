import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AddBox from './AddBox'

const classes = ({ currentUser }) => {
    return (
        <Box width="100%" minHeight="100vh" p={2}
            sx={{ backgroundColor: "#f6f6f6" }}
        >
            <Grid
                container width="100%"
                m="0px" direction="row" spacing={2} pb={2}
                sx={{ backgroundColor: "#fff", boxShadow: 2 }}
            >
                <Grid
                    item xs={12} sm={6} lg={3}
                >
                    <AddBox currentUser={currentUser} />
                </Grid>


            </Grid>
        </Box>
    )
}

export default classes