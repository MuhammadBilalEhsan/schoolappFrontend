import React from "react";
import { Box, Avatar, TextField } from "@mui/material";
import { AiOutlineSend } from "react-icons/ai";

const SendingMessageInputComp = ({
  userName,
  autoFocus,
  placeholder,
  value,
  setValue,
  name,
  color,
  submitFunc,
  type,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "7.5px",
        marginTop: 1,
        marginBottom: 2,
        justifySelf: "flex-end",
        padding: "1rem 1.5rem",
        border: "1.8px solid #00000033",
      }}
    >
      <Box width="100%">
        <Box display="flex" justifyContent="center">
          <Box width="65px">
            <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>
              {userName}
            </Avatar>
          </Box>
          <Box flexGrow={1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitFunc(e);
              }}
            >
              <TextField
                sx={{
                  borderRadius: 4,
                }}
                size="small"
                autoFocus={autoFocus ? autoFocus : true}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    submitFunc(e);
                  }
                }}
                autoComplete="off"
                fullWidth
                // multiline
                color={color}
                inputProps={{ maxLength: 120 }}
                InputProps={{
                  endAdornment: (
                    <AiOutlineSend
                      onClick={(e) => submitFunc(e)}
                      size="26px"
                      color="green"
                      style={{ cursor: "pointer" }}
                    />
                  ),
                }}
              />
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SendingMessageInputComp;
