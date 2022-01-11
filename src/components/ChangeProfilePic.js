import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { BsCameraFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import appSetting from "../appSetting/appSetting";
import axios from "axios";

export default function ChangeProfilePic({
  curUser,
  setImgURL,
  setSeverity,
  setOpenSnack,
}) {
  const LS = JSON.parse(localStorage.getItem("me"));
  const [open, setOpen] = useState(false);
  const [imgObj, setImgObj] = useState(null);
  const [loadBtn, setLoadBtn] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (img) => {
    const size = img?.size;
    const type = img?.type;
    if (!img) {
      setOpenSnack("please Select an image");
      setSeverity("error");
    } else if (
      Boolean(type === "image/png") ||
      Boolean(type === "image/jpeg") ||
      Boolean(type === "image/jpg")
    ) {
      setImgObj(img);
    } else if (size > 5000000) {
      setOpenSnack("please Select an image of size less then 5 mbs.");
      setSeverity("error");
    } else {
      setOpenSnack("you can select only image...");
      setSeverity("error");
    }
  };

  const saveImg = async (e) => {
    e.preventDefault();
    try {
      if (imgObj) {
        setLoadBtn(true);
        let formData = new FormData();
        formData.append("_id", curUser?._id);
        formData.append("myImg", imgObj);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authentication: `Bearer ${LS?.token}`,
          },
        };
        const res = await axios.post(
          `${appSetting.severHostedUrl}/user/editprofileimg`,
          formData,
          config
        );
        if (res) {
          // console.log("pPic", res.data.pPic)
          setImgURL(res.data.pPic);
          setOpenSnack(res.data.message);
          setSeverity("success");
          setLoadBtn(false);
        }
        handleClose();
      } else {
        setOpenSnack("Please Select an Image");
        setSeverity("error");
      }
    } catch (error) {
      setLoadBtn(false);
      setOpenSnack(error?.response?.data?.error);
      setSeverity("error");
      handleClose();
    }
  };

  return (
    <div>
      <Tooltip title="Edit Profile Picture" arrow>
        <Box>
          <BsCameraFill
            style={{ cursor: "pointer" }}
            onClick={handleClickOpen}
            size="20px"
            color="green"
            height="100%"
          />
        </Box>
      </Tooltip>

      {/* Openning Dialouge Box */}
      <Dialog
        open={open}
        // onClose={handleClose}
        disablebackdropclick={""}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle align="center" backgroundColor="white">
          Edit Picture
        </DialogTitle>
        <DialogContent>
          <form method="POST">
            <Box display="flex">
              <Box
                flexGrow={1}
                pt={1}
                px={1}
                border="1px solid green"
                borderRadius={1}
              >
                {imgObj?.name ? imgObj?.name : "Currently No Image"}
              </Box>
              <Button component="label">
                <FaUserEdit color="green" size="22px" />
                <input
                  hidden
                  name="myImg"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleChange(e.target.files[0])}
                />
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained" onClick={saveImg}>
						save image
					</Button> */}

          <LoadingButton
            // size="large"
            // type="submit"
            // mt={2}
            onClick={saveImg}
            variant="contained"
            color="success"
            loading={loadBtn}
            // sx={{ py: loadBtn ? 2.7 : 1, mt: 4 }}
            // fullWidth
          >
            Set as Profile
          </LoadingButton>

          <Button color="success" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
