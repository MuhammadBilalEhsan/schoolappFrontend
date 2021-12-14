import React from "react";
import { TextField } from "@mui/material";

const CourseOutlineComp = ({
	courseOutlineArr,
	coOutErr,
	editCourse,
	onChange,
}) => {


	return (
		<>
			{
				courseOutlineArr?.map((curObj, ind) => {
					return (

						<span key={ind} >
							<TextField
								margin="dense"
								id={`${ind}`}
								sx={{ marginTop: 1 }}
								name={Object.keys(curObj)[0]}
								label={`week ${ind + 1}`}
								type="text"
								variant="outlined"
								value={curObj?.week}
								onChange={(e) => onChange(e, ind)}
								autoComplete="off"
								color={editCourse ? "warning" : "success"}
								fullWidth
								maxLength={12}
								inputProps={{ maxLength: 80 }}
							/>
						</span>
					)
				})
			}
			{
				coOutErr ? (
					<p style={{ color: "red", marginLeft: "5px" }}>
						Please Define Outline Of All Weeks.
					</p>
				) : (
					""
				)
			}
		</>
	);
};

export default CourseOutlineComp;

