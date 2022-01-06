import React, { useState } from 'react'
import Box from "@mui/material/Box"
// import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
// import { RiLockPasswordFill } from "react-icons/ri"
import { BsExclamationCircle } from "react-icons/bs"

import { useFormik } from "formik";
import * as yup from "yup"
import MuiSnacks from "./MuiSnacks"
import axios from 'axios'
import appSetting from '../appSetting/appSetting'

const LS = JSON.parse(localStorage.getItem("me"))

const ChangePassword = () => {
    const [loadBtn, setLoadBtn] = useState(false);
    const [openSnack, setOpenSnack] = useState("");
    const [severity, setSeverity] = useState("");

    const formik = useFormik({
        initialValues: {
            id: LS?.id,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: yup.object().shape({
            oldPassword: yup.string()
                .required("Old Pasword is Required.")
                .min(8, "Old password contains at least 8 characters.."),
            newPassword: yup.string()
                .min(8, "New password contains at least 8 characters..")
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required("New Pasword is Required.") : field
                ),
            confirmPassword: yup.string().when('newPassword', (newPassword, field) =>
                newPassword ? field.required("Confirm Pasword is Required.").oneOf([yup.ref('newPassword')]) : field
            ),
        }),


        onSubmit: async (values, actions) => {
            try {
                setLoadBtn(true)
                const res = await axios.post(`${appSetting.severHostedUrl}/user/changepassword`,
                    values,
                    { headers: { Authentication: `Bearer ${LS?.token}` } })
                if (res) {
                    actions.resetForm()
                    setLoadBtn(false);
                    setOpenSnack(res.data.message);
                    setSeverity("success");
                }
            } catch (error) {
                setLoadBtn(false);
                setOpenSnack(error?.response?.data?.error);
                setSeverity("error");
            }
        }
    });

    return (
        <Box width="100%" minHeight="100vh"
            sx={{ backgroundColor: "#f6f6f6" }}
            display="flex" justifyContent="center" alignItems="flex-start"
        >
            <Box
                width={{ xs: "90%", sm: "500px" }}
                mx={2} mt={4} px={3} py={"50px"}
                sx={{ backgroundColor: "#fff", boxShadow: 2 }}
            >
                {openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="oldPassword"
                        label="Old Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange("oldPassword")}
                        autoComplete="off"
                        fullWidth
                        color={"success"}
                        inputProps={{ maxLength: 32 }}
                        sx={{ mt: 2 }}
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position="start">
                    //             <RiLockPasswordFill size="20px" />
                    //         </InputAdornment>
                    //     ),
                    // }}
                    />
                    {formik.errors.oldPassword && formik.touched.oldPassword && (
                        <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                            <BsExclamationCircle color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.oldPassword}
                        </Typography>
                    )}
                    <TextField
                        margin="dense"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange("newPassword")}
                        autoComplete="off"
                        fullWidth
                        color={"success"}
                        inputProps={{ maxLength: 32 }}
                        sx={{ mt: 2 }}
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position="start">
                    //             <RiLockPasswordFill size="20px" />
                    //         </InputAdornment>
                    //     ),
                    // }}
                    />
                    {formik.errors.newPassword && formik.touched.newPassword && (
                        <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                            <BsExclamationCircle color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.newPassword}
                        </Typography>
                    )}
                    <TextField
                        margin="dense"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange("confirmPassword")}
                        autoComplete="off"
                        fullWidth
                        color={"success"}
                        inputProps={{ maxLength: 32 }}
                        sx={{ mt: 2 }}
                    // InputProps={{
                    //     startAdornment: (
                    //         <InputAdornment position="start">
                    //             <RiLockPasswordFill size="20px" />
                    //         </InputAdornment>
                    //     ),
                    // }}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <Typography variant="body2" sx={{ color: "red", marginLeft: "5px", display: "flex", alignItems: "center" }}>
                            <BsExclamationCircle color="red" size="16px" style={{ marginRight: "8px" }} /> {formik.errors.confirmPassword}
                        </Typography>
                    )}
                    <LoadingButton
                        size="large"
                        type="submit"
                        mt={2}
                        variant="contained"
                        color="success"
                        fullWidth
                        loading={loadBtn}
                        sx={{ py: loadBtn ? 2.7 : 1, mt: 4 }}
                    >
                        {loadBtn ? "" : "Change Password"}
                    </LoadingButton>
                </form>

            </Box>
        </Box >
    )
}

export default ChangePassword
