import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AddBox from './AddBox'
import ClassBox from './ClassBox'

const Classes = ({ currentUser }) => {

    useEffect(() => {
    }, [currentUser])

    return (
        <Box width="100%" minHeight="100vh" p={2}
            sx={{ backgroundColor: "#f6f6f6" }}
        >
            <Grid
                container width="100%"
                m="0px" direction="row" spacing={2}
                sx={{ backgroundColor: "#fff", boxShadow: 2 }}
                pr={2} pb={2}
            >
                <Grid
                    item xs={12} md={6} lg={4}
                >
                    <AddBox currentUser={currentUser} />
                </Grid>
                {
                    currentUser?.classes?.length > 0 ?
                        currentUser?.classes?.map((classTitle, index) => {
                            return (
                                <Grid key={index}
                                    item xs={12} md={6} lg={4}
                                >
                                    <ClassBox title={classTitle} currentUser={currentUser} />
                                </Grid>
                            )
                        })
                        : ""
                }


            </Grid>
        </Box>
    )
}

export default Classes