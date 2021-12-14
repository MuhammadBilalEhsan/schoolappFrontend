import React, { useState, useEffect } from "react";
import { Chip, TextField, } from "@mui/material";

export default function AddTopic({
	topicChips,
	setTopicChips,
	topicErr,
	setTopicErr,
	editCourse,
	course,
}) {
	useEffect(() => {
		if (editCourse) {
			const preVals = course?.topics.map((item) => item)
			setTopicChips(preVals)
		}
	}, [])
	const [topicLabel, setTopicLabel] = useState("");
	const handleDelete = (chipToDelete) => () => {
		setTopicChips((chips) =>
			topicChips.filter((chip) => chip.key !== chipToDelete.key),
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
				setTopicChips([

					...topicChips,
					topicObj,
				]);
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
		if (topicLabel.length >= 10) {
			addChip();
		}
	};
	const handleKeyPress = (e) => {
		if (e.key === " " || e.key === "Enter") {
			addChip();
		}
	};

	return (
		<div width="100%" style={{ display: "flex", flexDirection: "column" }} >
			<TextField
				InputProps={{
					startAdornment: (
						<span>
							{topicChips?.map((data) => {
								return (
									<Chip
										sx={{
											backgroundColor: editCourse ? "orange" : "#00800030",
											marginRight: 1,
											marginTop: 1,
										}}
										key={data.key}
										label={data.label}
										onDelete={handleDelete(data)}
									/>
								);
							})}
						</span>
					),
				}}
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
				color={editCourse ? "warning" : "success"}
				fullWidth
			/>
			{
				topicErr ? (
					<p style={{ color: "red", marginLeft: "5px" }} >
						Please Add at least 1 Topic
					</p >
				) : (
					""
				)}
		</div >
	);
}
