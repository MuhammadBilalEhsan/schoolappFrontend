import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import { BiUser } from "react-icons/bi";
import { BsExclamationDiamond } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
// import "../css/login.css";
import appSetting from "../appSetting/appSetting";
import MuiSnacks from "./MuiSnacks";
import { useFormik } from "formik";
import * as yup from "yup";
import { curUserFun } from "../redux/actions";
import { useDispatch } from "react-redux";
import MuiTextField from "./MuiTextField";
import ValidationComp from "./ValidationComp";
// const me = JSON.parse(localStorage.getItem("me"))

const Login = ({ setAuth, setCurUser, setIsAdmin, setNowLogin }) => {
  const [loadBtn, setLoadBtn] = useState(false);

  const [openSnack, setOpenSnack] = useState("");
  const [severity, setSeverity] = useState("");

  // const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Does not looks like an email")
        .required("Email is Required."),
      password: yup
        .string()
        .required("Pasword is Required.")
        .min(8, "password contains at least 8 characters.."),
    }),
    onSubmit: async (values) => {
      try {
        setLoadBtn(true);

        const res = await axios.post(
          `${appSetting.severHostedUrl}/login`,
          values
        );
        if (res) {
          const token = res.data.token;
          const user = res.data.user;
          setCurUser(user);
          setLoadBtn(false);
          localStorage.setItem(
            "me",
            JSON.stringify({
              id: user._id,
              role: user.roll,
              atClass: user.atClass,
              token,
            })
          );
          if (user.isAdmin) {
            dispatch(curUserFun(user));
            setAuth(true);
            setIsAdmin(true);
            // setNowLogin(true)
          } else {
            dispatch(curUserFun(user));
            setAuth(true);
            // setNowLogin(true)
            // history.push("/profile");
          }
          setNowLogin(true);
          // history.push("/dashboard");
        }
      } catch (error) {
        setLoadBtn(false);
        setOpenSnack(error?.response?.data?.error);
        setSeverity("error");
      }
    },
  });
  return (
    <Box
      className={`login_main`}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
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
      <Box textAlign="center" mx={2}>
        <IconButton
          sx={{
            width: "120px",
            height: "120px",
            backgroundColor: "#2e7d32",
            zIndex: 1,
            "&:hover": { backgroundColor: "#2e7d32" },
            borderTop: "1px solid #236826",
            position: "relative",
            top: "80px",
          }}
        >
          <BiUser color="#fff" size="100px" />
        </IconButton>
        <Box
          fullWidth
          sx={{
            border: "20px solid transparent",
            maxWidth: { xs: "500px" },
            mb: 9,
          }}
          boxShadow={5}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              minWidth: "100%",
            }}
            boxShadow={5}
            p={4}
          >
            <form
              method="POST"
              onSubmit={formik.handleSubmit}
              style={{ textAlign: "center", minWidth: "100%" }}
            >
              <MuiTextField
                autoFocus={true}
                mt={7}
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
                {loadBtn ? "" : "Login"}
              </LoadingButton>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
