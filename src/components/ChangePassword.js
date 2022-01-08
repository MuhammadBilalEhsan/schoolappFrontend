import React, { useState } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import { useFormik } from "formik";
import * as yup from "yup";
import MuiSnacks from "./MuiSnacks";
import axios from "axios";
import appSetting from "../appSetting/appSetting";
import MuiTextField from "./MuiTextField";
import ValidationComp from "./ValidationComp";

const ChangePassword = () => {
  const LS = JSON.parse(localStorage.getItem("me"));
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
      oldPassword: yup
        .string()
        .required("Old Pasword Required.")
        .min(8, "Old password contains at least 8 characters.."),
      newPassword: yup
        .string()
        .min(8, "New password contains at least 8 characters..")
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required("New Pasword Required.") : field
        ),
      confirmPassword: yup
        .string()
        .when("newPassword", (newPassword, field) =>
          newPassword
            ? field
                .required("Confirm Pasword Required.")
                .oneOf(
                  [yup.ref("newPassword")],
                  "Make sure New Password and Confirm Password match."
                )
            : field
        ),
    }),

    onSubmit: async (values, actions) => {
      try {
        setLoadBtn(true);
        const res = await axios.post(
          `${appSetting.severHostedUrl}/user/changepassword`,
          values,
          { headers: { Authentication: `Bearer ${LS?.token}` } }
        );
        if (res) {
          actions.resetForm();
          setLoadBtn(false);
          setOpenSnack(res.data.message);
          setSeverity("success");
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
      width="100%"
      minHeight="88vh"
      sx={{ backgroundColor: "#f6f6f6" }}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box
        width={{ xs: "90%", sm: "500px" }}
        mx={2}
        mt={4}
        px={3}
        py={"50px"}
        sx={{ backgroundColor: "#fff", boxShadow: 2 }}
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
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <MuiTextField
            autoFocus={true}
            label="Old Password"
            type="password"
            inputProps={{ ...formik.getFieldProps("oldPassword") }}
            color={
              formik.touched.oldPassword && formik.errors.oldPassword
                ? "error"
                : "success"
            }
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <ValidationComp error={formik.errors.oldPassword} />
          ) : null}
          <MuiTextField
            label="New Password"
            type="password"
            inputProps={{ ...formik.getFieldProps("newPassword") }}
            color={
              formik.touched.newPassword && formik.errors.newPassword
                ? "error"
                : "success"
            }
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <ValidationComp error={formik.errors.newPassword} />
          ) : null}
          <MuiTextField
            label="Confirm Password"
            type="password"
            inputProps={{ ...formik.getFieldProps("confirmPassword") }}
            color={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "error"
                : "success"
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <ValidationComp error={formik.errors.confirmPassword} />
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
            {loadBtn ? "" : "Change Password"}
          </LoadingButton>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
