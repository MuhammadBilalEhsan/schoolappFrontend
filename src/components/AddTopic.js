import React, { useState, useEffect } from "react";
// import { Chip, TextField, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

export default function AddTopic({
  topicChips,
  setTopicChips,
  topicErr,
  setTopicErr,
  editCourse,
  course,
  inputProps,
}) {
  useEffect(() => {
    if (editCourse) {
      const preVals = course?.topics.map((item) => item);
      setTopicChips(preVals);
    }
  }, []);
  const [topicLabel, setTopicLabel] = useState("");
  const handleDelete = (chipToDelete) => () => {
    setTopicChips((chips) =>
      topicChips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const addChip = () => {
    const topicLabelTrim = topicLabel.trim();
    if (!topicLabelTrim) {
      setTopicLabel("");
    } else {
      const topicObj = {
        key: new Date().getTime().toString(),
        label: topicLabelTrim,
      };
      if (editCourse === true) {
        setTopicChips([...topicChips, topicObj]);
        setTopicLabel("");
        setTopicErr(false);
      } else {
        setTopicChips([...topicChips, topicObj]);
        setTopicLabel("");
        setTopicErr(false);
      }
    }
  };
  const handleChange = (e) => {
    setTopicLabel(e.target.value);
    if (topicLabel.length >= 39) {
      addChip();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addChip();
    }
  };

  return (
    <div width="100%" style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        sx={{
          maxWidth: "100%",
          wordBreak: "break-all",
        }}
        sx={{ mt: 2 }}
        InputProps={{
          startAdornment:
            // <span>
            topicChips?.map((data) => {
              return (
                <Chip
                  key={data.key}
                  sx={{
                    backgroundColor: "#00800030",
                    // mr: 1,
                    // mb: 1,
                  }}
                  label={
                    data.label.length < 22
                      ? data.label
                      : // "bilal"
                        data.label
                  }
                  onDelete={handleDelete(data)}
                />
              );
            }),
          // </span>
        }}
        inputProps={inputProps}
        disabled={topicChips.length >= 10 ? true : false}
        margin="dense"
        name="topicItems"
        label="Topics"
        type="text"
        variant="outlined"
        value={topicLabel}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
        autoComplete="off"
        color="success"
        fullWidth
        // multiline
      />
      {topicErr ? (
        <p style={{ color: "red", marginLeft: "5px" }}>
          Please Add at least 1 Topic
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
