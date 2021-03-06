import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import moment from "moment";
import { socket } from "../App";
import { useDispatch } from "react-redux";
import { settingAssignments } from "../redux/actions";
import appSetting from "../appSetting/appSetting";

const Assignment = ({
  currentCourse,
  btnTitle,
  tooltipTitle,
  curUser,
  btnIcon,
  dialogTitle,
  actionTitle,
  isTeacher,
  btnStartIcon,
  btnColor,
  btnVariant,
  currentAssignment,
  input2label,
  setOpenSnack,
  setSeverity,
  setAllAssignments,
}) => {
  const LS = JSON.parse(localStorage.getItem("me"));
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [loadBtn, setLoadBtn] = useState(null);

  const handleDialog = () => {
    setOpenAssignDialog(true);
  };
  const closeDialog = () => {
    setOpenAssignDialog(false);
  };
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const size = selectedFile.size / 1024 / 1024;
      if (size > 10) {
        setOpenSnack("file Size is too long");
        setSeverity("error");
      } else {
        setFile(selectedFile);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      title: isTeacher ? "" : currentAssignment?.title,
      desc: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is Required Field..."),
    }),

    onSubmit: async (values, actions) => {
      try {
        if (!file && !values.desc) {
          setOpenSnack(
            "You cannot leave both files and description blank at the same time"
          );
          setSeverity("error");
        } else {
          let formData = new FormData();
          if (!values.desc && file) {
            formData.append("myFile", file);
          } else if (!file && values.desc) {
            formData.append("desc", values.desc);
          } else {
            formData.append("desc", values.desc);
            formData.append("myFile", file);
          }
          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          if (isTeacher) {
            setLoadBtn(true);
            formData.append("title", values.title);
            formData.append("courseID", currentCourse?._id);
            const res = await axios.post(
              `${appSetting.severHostedUrl}/assignment/add`,
              formData,
              { headers: { Authentication: `Bearer ${LS?.token}` } },
              config
            );
            if (res) {
              closeDialog();
              setFile(null);
              actions.resetForm();
              if (res.data.message) {
                setAllAssignments(res.data.allAssignment);
                // console.log("res.data.assignment", res.data.allAssignment)
                socket.emit("assignmentAdd", res.data.allAssignment);
                dispatch(settingAssignments(res.data.allAssignment));
                setOpenSnack(res.data.message);
                setSeverity("success");
              }
              setLoadBtn(false);
            }
          } else {
            setLoadBtn(true);
            formData.append("assignmentID", currentAssignment?._id);
            formData.append("id", `${curUser?._id}`);
            formData.append("name", `${curUser?.fname} ${curUser?.lname}`);
            formData.append("time", moment().format("hh:mm:ss A"));
            console.log("asdf");
            const res = await axios.post(
              `${appSetting.severHostedUrl}/assignment/submit`,
              formData,
              { headers: { Authentication: `Bearer ${LS?.token}` } },
              config
            );
            if (res) {
              closeDialog();
              setFile(null);
              actions.resetForm();
              socket.emit("changeInAssignment", res.data.assignment);
              // if (res.data.message) {
              setOpenSnack(res.data.message);
              setSeverity("success");
              // }
              setLoadBtn(false);
            }
          }
        }
      } catch (error) {
        setOpenSnack(error?.response?.data?.error);
        setSeverity("error");
        closeDialog();
      }
    },
  });

  return (
    <>
      <Tooltip title={tooltipTitle} arrow>
        <Button
          startIcon={btnStartIcon}
          onClick={handleDialog}
          color={btnColor}
          sx={{ marginTop: isTeacher ? 3 : 0, borderRadius: 5 }}
          variant={btnVariant}
        >
          {btnTitle || btnIcon}
        </Button>
      </Tooltip>
      <Dialog
        open={openAssignDialog}
        // onClose={closeDialog}
        disablebackdropclick={""}
        fullWidth
        maxWidth="sm"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <form method="POST" onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              variant="filled"
              value={isTeacher ? formik.values.title : currentAssignment?.title}
              onChange={formik.handleChange("title")}
              autoComplete="off"
              disabled={isTeacher ? false : true}
              fullWidth
              color="success"
              inputProps={{ maxLength: 32, required: true }}
            />
            {formik.errors.title && formik.touched.title && (
              <p style={{ color: "red", marginLeft: "5px" }}>
                {formik.errors.title}
              </p>
            )}
            <TextField
              margin="dense"
              name="desc"
              label={input2label}
              type="text"
              variant="filled"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              autoComplete="off"
              fullWidth
              color="success"
              multiline
              minRows={2}
              inputProps={{ maxLength: 500 }}
            />
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box
                border="1px solid rgba(0, 0, 0, 0.09)"
                px={"14px"}
                mt={1}
                py={"7px"}
                flexGrow={1}
              >
                <Typography variant="subtitle1">
                  {file ? file.name : "No File Selected"}
                </Typography>
              </Box>
              <Tooltip title="Attech File" arrow>
                <Button component="label" sx={{ borderRadius: 5 }}>
                  <GrAttachment size="20px" color="white" />
                  <input
                    type="file"
                    onChange={(e) => handleChange(e)}
                    accept=".zip,.txt,.psd,.pptx,.pptx,.png,.jpeg,.jpg,.pdf,.docx,.doc"
                    hidden
                  />
                </Button>
              </Tooltip>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={formik.handleSubmit} color="success" variant="contained">{actionTitle}</Button> */}
          <LoadingButton
            // type="submit"
            onClick={(e) => {
              e.stopPropagation();
              formik.handleSubmit();
            }}
            variant="contained"
            color="success"
            loading={loadBtn}
          >
            {actionTitle}
          </LoadingButton>
          <Button onClick={closeDialog} color="success" variant="outlined">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Assignment;
