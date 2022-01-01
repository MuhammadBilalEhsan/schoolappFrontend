import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import appSetting from '../../appSetting/appSetting';
import MuiSnacks from '../MuiSnacks';
import { socket } from '../../App';
import { useFormik } from "formik";
import * as yup from "yup";

import { FiPlus } from "react-icons/fi"
import { RiArrowDropDownFill } from "react-icons/ri"
import { BsExclamationDiamond } from "react-icons/bs"
// import { useDispatch } from 'react-redux';


function AddUserDialog({ title, classesArray }) {
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");
    const [classState, setClassState] = useState("");

    // Menu Handling Start
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const menuClose = () => {
        setAnchorEl(null);
    };
    // Menu Handling End

    // const dispatch = useDispatch()
    // Dialog Handling Start
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // Dialog Handling End


    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            password: "",
            roll: "",
            atClass: title ? title : ""
        },
        validationSchema: yup.object().shape({
            fname: yup.string()
                .required("First Name is Required."),
            lname: yup.string()
                .required("Last Name is Required."),
            email: yup.string().email("Does not looks like an email")
                .required("Email is Required."),
            password: yup.string()
                .required("Pasword is Required.")
                .min(8, "password contains at least 8 characters.."),
            roll: yup.string()
                .required("Role is Required."),
            atClass: yup.string()
                .required("Class is Required."),

        }),


        onSubmit: async (values) => {
            try {
                let obj = {
                    fname: values.fname.toLowerCase(),
                    lname: values.lname.toLowerCase(),
                    email: values.email.toLowerCase(),
                    roll: values.roll,
                    atClass: values.atClass,
                    password: values.password,
                }

                const res = await axios.post(`${appSetting.severHostedUrl}/user/register`, obj, { withCredentials: true });
                if (res) {
                    socket.emit("newUserAdded", res.data.user)
                    if (res.data.message) {
                        setOpenSnack(res.data.message)
                        setSeverity("success")
                        handleClose()
                    } else {
                        setOpenSnack(res.data.error)
                        setSeverity("error")
                        handleClose()
                    }
                }
            } catch (error) {
                console.log(error);
                handleClose();
            }
        }
    });
    return (
        <div>
            {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

            {title ?
                <MenuItem onClick={handleClickOpen}>
                    Add User
                </MenuItem>
                :
                <Button onClick={handleClickOpen}
                    variant="contained"

                    sx={{
                        boxShadow: 5,
                        "&:hover": { backgroundColor: "#014201" },
                        backgroundColor: "#014201",
                        color: "#fff",
                    }}

                    endIcon={<FiPlus color="white" />}
                >
                    Add User
                </Button>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    <strong>
                        Add User{title ? ` in "${title}"` : ""}
                    </strong>
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form" width="100%"
                        p={2}
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            autoFocus
                            sx={{ mt: 2 }}
                            type="text"
                            color="success"
                            label="First Name"
                            variant="outlined"
                            value={formik.values.fname}
                            onChange={formik.handleChange("fname")}
                            inputProps={{ maxLength: 16 }}
                            fullWidth
                        />
                        {formik.errors.fname && formik.touched.fname && (
                            <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                <BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.fname}
                            </Typography>
                        )}
                        <TextField
                            sx={{ mt: 2 }}
                            type="text"
                            color="success"
                            label="Last Name"
                            variant="outlined"
                            value={formik.values.lname}
                            onChange={formik.handleChange("lname")}
                            inputProps={{ maxLength: 16 }}
                            fullWidth
                        />
                        {formik.errors.lname && formik.touched.lname && (
                            <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                <BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.lname}
                            </Typography>
                        )}
                        <FormLabel component="legend" sx={{ mt: 2 }}>Role:</FormLabel>
                        <RadioGroup
                            row
                        >
                            <FormControlLabel onChange={(e) => formik.values.roll = String(e.target.value)} value="teacher" control={<Radio color='success' />} label="Teacher" />
                            <FormControlLabel onChange={(e) => formik.values.roll = String(e.target.value)} value="student" control={<Radio color='success' />} label="Student" />
                        </RadioGroup>
                        {formik.errors.roll && formik.touched.roll && (
                            <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                <BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.roll}
                            </Typography>
                        )}
                        <Button
                            aria-expanded={menuOpen ? 'true' : undefined}
                            sx={{ mt: 2 }} color="success" variant='outlined'
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            disabled={title ? true : false}
                            endIcon={<RiArrowDropDownFill color="inherit" />}
                        >
                            {
                                title ? title : classState ? classState : "Select Class"
                            }
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={menuOpen}
                            onClose={menuClose}
                        >
                            {classesArray?.map((classTitle, index) => {
                                return (
                                    <MenuItem key={index} onClick={
                                        () => {
                                            menuClose()
                                            setClassState(classTitle)
                                            formik.values.atClass = classTitle
                                        }
                                    }
                                    >
                                        {classTitle}
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                        {formik.errors.atClass && formik.touched.atClass && (
                            <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                <BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.atClass}
                            </Typography>
                        )}
                        <TextField
                            sx={{ mt: 2 }}
                            type="email"
                            color="success"
                            label="email"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            inputProps={{ maxLength: 32 }}
                            fullWidth
                        />
                        {formik.errors.email && formik.touched.email && (
                            <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                <BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.email}
                            </Typography>
                        )}
                        <TextField
                            sx={{ mt: 2 }}
                            type="password"
                            color="success"
                            label="Password"
                            variant="outlined"
                            value={formik.values.password}
                            onChange={formik.handleChange("password")}
                            fullWidth
                        />
                        {formik.errors.password && formik.touched.password && (
                            <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                                <BsExclamationDiamond color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.password}
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={formik.handleSubmit}
                    >
                        Register
                    </Button>
                    <Button variant="outlined" color="success" onClick={handleClose} autoFocus >
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
export default AddUserDialog;