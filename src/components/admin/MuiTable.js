import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { ImBlocked } from 'react-icons/im';
import { BsChatDotsFill } from 'react-icons/bs';
import { RiInformationLine } from 'react-icons/ri';

const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#014201",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function MuiTable({ tableBody }) {
    return (
        <TableContainer component={Paper} >
            <Table
                size='small'
                sx={{
                    minWidth: 700, maxWidth: 1000, position: "absolute", cursor: "pointer",
                    overflowX: "scroll", border: "1px solid #014201",
                }}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: "5%" }}>Index No.</StyledTableCell>
                        <StyledTableCell sx={{ width: "15%" }}>Full Name</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: "5%" }}>Age</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: "15%" }}>Son of</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: "10%" }}>Class</StyledTableCell>
                        <StyledTableCell align="center" colSpan={3} sx={{ width: "50%" }}>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableBody?.map((user, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        {index + 1}.
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        {`${user.fname} ${user.lname}`}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {user.age ? user.age : "-"}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {user.fatherName ? user.fatherName : "-"}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {user.atClass}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Tooltip title="View" arrow>
                                            <IconButton>
                                                <RiInformationLine color="#014201" size="22px" />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Tooltip title="Send Message" arrow>
                                            <IconButton>
                                                <BsChatDotsFill color="#014201" size="18px" />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Tooltip title={user.blocked ? "Unblock" : "Block User"} arrow>
                                            <IconButton>
                                                <ImBlocked
                                                    size="18px"
                                                    color={user.blocked ? "red" : ""}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
