import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import axios from "axios";
import appSetting from "../../appSetting/appSetting";
import MuiSnacks from "../MuiSnacks";
import MuiTextField from "../MuiTextField";
import { socket } from "../../App";
import { useFormik } from "formik";
import * as yup from "yup";

import { FiPlus } from "react-icons/fi";
import { RiArrowDropDownFill } from "react-icons/ri";
import ValidationComp from "../ValidationComp";
import { Typography } from "@mui/material";
// import { useDispatch } from 'react-redux';

function AddUserDialog({ title, classesArray, role }) {
  const LS = JSON.parse(localStorage.getItem("me"));
  const [loadBtn, setLoadBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState("");
  const [severity, setSeverity] = useState("");
  const [classState, setClassState] = useState("");
  const [teacherRadio, setTeacherRadio] = useState();
  const [studentRadio, setStudentRadio] = useState();
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
      roll: String(role),
      atClass: title ? title : "",
    },

    validationSchema: yup.object().shape({
      fname: yup.string().required("First Name Required."),
      lname: yup.string().required("Last Name Required."),
      email: yup
        .string()
        .email("Not looks like an email")
        .required("Email Required."),
      password: yup
        .string()
        .required("Pasword Required.")
        .min(8, "password contains at least 8 characters.."),
      roll: yup.string().required("Role Required."),
      atClass: yup.string().required("Class Required."),
    }),

    onSubmit: async (values, actions) => {
      try {
        // setLoadBtn(true);
        let obj = {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          roll: values.roll,
          atClass: values.atClass,
          password: values.password,
        };

        // console.log("obj", obj);

        const res = await axios.post(
          `${appSetting.severHostedUrl}/user/register`,
          obj,
          { headers: { Authentication: `Bearer ${LS?.token}` } }
        );
        if (res.data.user) {
          socket.emit("newUserAdded", res.data.user);
          setOpenSnack(res.data.message);
          setSeverity("success");
          handleClose();
          actions.resetForm();
          setClassState("Select Class");
          setTeacherRadio(false);
          setStudentRadio(false);
          setLoadBtn(false);
        }
      } catch (error) {
        setOpenSnack(error?.response?.data?.error);
        setSeverity("error");
        setLoadBtn(false);
        // handleClose();
      }
    },
  });
  useEffect(() => {
    formik.values.roll = String(role);
  }, [role]);
  // useEffect(() => {
  //   if (role) {
  //     if (role === "teacher") {
  //       setStudentRadio(false);
  //       setTeacherRadio(true);
  //     } else if (role === "student") {
  //       setStudentRadio(true);
  //       setTeacherRadio(false);
  //     }
  //   } else {
  //     setStudentRadio(false);
  //     setTeacherRadio(false);
  //   }
  // }, [role]);
  return (
    <div>
      {openSnack ? (
        <MuiSnacks
          openSnack={openSnack}
          severity={severity}
          text={openSnack}
          setOpenSnack={setOpenSnack}
        />
      ) : (
        ""
      )}

      {title ? (
        <MenuItem onClick={handleClickOpen}>create {role}</MenuItem>
      ) : (
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="success"
          sx={{
            boxShadow: 5,
          }}
          endIcon={<FiPlus color="white" />}
        >
          Create User
        </Button>
      )}
      <Dialog
        open={open}
        //  onClose={handleClose}
        disablebackdropclick={""}
        fullWidth
        maxWidth="xs"
      >
        {/* <DialogTitle>
          <strong>Add User{title ? ` in "${title}"` : ""}</strong>
        </DialogTitle> */}
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            style={{ padding: "16px", width: "100%" }}
          >
            <MuiTextField
              label="First Name"
              autoFocus={true}
              inputProps={{ ...formik.getFieldProps("fname"), maxLength: 16 }}
              color={
                formik.touched.fname && formik.errors.fname
                  ? "error"
                  : "success"
              }
            />
            {formik.touched.fname && formik.errors.fname ? (
              <ValidationComp error={formik.errors.fname} />
            ) : null}
            <MuiTextField
              label="Last Name"
              inputProps={{ ...formik.getFieldProps("lname"), maxLength: 16 }}
              color={
                formik.touched.lname && formik.errors.lname
                  ? "error"
                  : "success"
              }
              //  variant="outlined"
            />
            {formik.errors.lname && formik.touched.lname ? (
              <ValidationComp error={formik.errors.lname} />
            ) : null}

            {role ? (
              <Typography
                variant="subtitle1"
                mt={2}
                // sx={{ display: "inline-block" }}
              >
                Role: &nbsp;
                <strong
                  style={{ color: "darkgreen", textTransform: "capitalize" }}
                >
                  {role}
                </strong>
              </Typography>
            ) : (
              <>
                <FormLabel component="legend" sx={{ mt: 2 }}>
                  Role:
                </FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    onChange={(e) => {
                      formik.setFieldValue("roll", String(e.target.value));
                      setTeacherRadio(true);
                      setStudentRadio(false);
                    }}
                    disabled={role === "student" ? true : false}
                    checked={teacherRadio}
                    // onClick={() => {
                    //   // formik.values.roll = "teacher";
                    // }}
                    value="teacher"
                    control={<Radio color="success" />}
                    label="Teacher"
                  />

                  <FormControlLabel
                    onChange={(e) => {
                      formik.setFieldValue("roll", String(e.target.value));
                      setStudentRadio(true);
                      setTeacherRadio(false);
                    }}
                    disabled={role === "teacher" ? true : false}
                    checked={studentRadio}
                    // onClick={() => {
                    // }}
                    value="student"
                    control={<Radio color="success" />}
                    label="Student"
                  />
                </RadioGroup>
              </>
            )}
            {formik.touched.roll && formik.errors.roll ? (
              <ValidationComp error={formik.errors.roll} />
            ) : null}
            <Button
              aria-expanded={menuOpen ? "true" : undefined}
              sx={{ mt: 2 }}
              color={
                formik.touched.atClass && formik.errors.atClass
                  ? "error"
                  : "success"
              }
              variant="outlined"
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
              disabled={title ? true : false}
              endIcon={<RiArrowDropDownFill color="inherit" />}
              // inputProps={{ ...formik.getFieldProps("atClass") }}
            >
              {title ? title : classState ? classState : "Select Class"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={menuClose}
              onClick={() => formik.setFieldTouched("atClass")}
            >
              {classesArray?.map((classTitle, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      menuClose();
                      setClassState(classTitle);
                      formik.values.atClass = classTitle;
                    }}
                  >
                    {classTitle}
                  </MenuItem>
                );
              })}
            </Menu>
            {formik.touched.atClass && formik.errors.atClass ? (
              <ValidationComp error={formik.errors.atClass} />
            ) : null}
            <MuiTextField
              label="Email"
              type="email"
              inputProps={{ ...formik.getFieldProps("email") }}
              color={
                formik.touched.email && formik.errors.email
                  ? "error"
                  : "success"
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <ValidationComp error={formik.errors.email} />
            ) : null}
            <MuiTextField
              label="Password"
              type="password"
              inputProps={{ ...formik.getFieldProps("password") }}
              color={
                formik.touched.password && formik.errors.password
                  ? "error"
                  : "success"
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <ValidationComp error={formik.errors.password} />
            ) : null}
            <input type="submit" style={{ display: "none" }} />
          </form>
          {/* </Box> */}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            size="small"
            color="success"
            onClick={formik.handleSubmit}
            loading={loadBtn}
            sx={{ py: loadBtn ? 2 : "5px", px: loadBtn ? 6.3 : "15px" }}
          >
            {loadBtn ? "" : "Register"}
          </LoadingButton>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              handleClose();
              formik.resetForm();
              setClassState("Select Class");
              formik.setFieldValue("roll", String(role));
              formik.setFieldValue("atClass", title ? String(title) : "");
              // if (role === "teacher") {
              //   setTeacherRadio(true);
              //   formik.values.roll = "teacher";
              // } else if (role === "student") {
              //   setStudentRadio(true);
              //   formik.values.roll = "student";
              // } else {
              //   setStudentRadio(false);
              //   setTeacherRadio(false);
              //   formik.values.roll = "";
              // }
              // setStudentRadio(false);
              // setTeacherRadio(false);
            }}
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddUserDialog;
