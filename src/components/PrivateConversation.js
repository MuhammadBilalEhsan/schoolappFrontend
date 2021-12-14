import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateConversation = ({ id }) => {
    // const con= useSelector(state=>state.usersReducer.)
    const [currentConversation, setCurrentConversation] = useState(null)
    const history = useHistory()
    useEffect(() => {
        // const findConversation = 
    }, [])
    return (
        <Box mx="auto" px={2} maxHeight="85vh" sx={{ overflowY: "auto" }} maxWidth="900px" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
            <Box mt={5} display="flex" justifyContent="flex-end" pb={1} px={2} width="100%" >
                <Button variant="contained" onClick={() => history.push("/messages")} size="small" color="success" sx={{ borderRadius: 5 }}>
                    Back
                </Button>
            </Box>
            <Box mt={5} display="flex" borderBottom="1px solid #00800085" justifyContent="flex-start" pb={1} px={2} width="100%" >
                <Typography variant="h5" color="green">
                    With Teacher !1
                </Typography>
            </Box>
            <Box width="100%">

            </Box>
        </Box>
    )
}

export default PrivateConversation
