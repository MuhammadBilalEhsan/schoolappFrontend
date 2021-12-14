import React, { useState } from "react";
import { Box, Typography, Chip, Grid, Button, Tooltip } from "@mui/material";
import Header from "./Header";
import AddCourse from "./AddCourse";
import MuiSnacks from "./MuiSnacks"
import { useHistory } from "react-router-dom";
import { VscGoToFile } from "react-icons/vsc"


const CDTeacher = ({ curUser, course, setAuth }) => {

	const [openSnack, setOpenSnack] = useState("");
	const [severity, setSeverity] = useState("");

	let { courseName, courseDesc, topics, duration, courseOutline } =
		course || {};

	const history = useHistory()
	return (
		<Box className={`_main`}>
			<Header curUser={curUser} setAuth={setAuth} />
			<Box width="95%" maxWidth="1100px" marginX="auto">
				{openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

				<Box mt={5} pb={2} display="flex" borderBottom="1px solid #00800085" justifyContent="space-between" pb={1} px={2} width="100%" >
					<Typography variant="h4" color="green" sx={{ textTransform: "capitalize" }}>
						{`${curUser.fname} ${curUser.lname}(${curUser.roll})`}
					</Typography>
					<Typography variant="body1" mt={2} color="green">
						{
							!course && curUser?.atClass ? <AddCourse
								curUser={curUser}
								course={course}
								editCourse={false}
								setSeverity={setSeverity}
								setOpenSnack={setOpenSnack}
							/> : !curUser?.atClass ? <Button color="success" size="small">Set Your Class</Button>
								: ""
						}
					</Typography>
				</Box>
				<Box
					width="100%"
					mt={3}
					p={3}
					pt={-1}
					color="green"
				// sx={{
				// 	bgcolor: "background.paper",
				// }}
				>
					{course && Object.entries(course).length > 0 ? (
						<Box>
							<Grid container>
								<Grid item mt={1} sm={6} xs={12} sx={{ wordWrap: "break-word" }}>
									<Typography color="black" variant="subtitle1">
										Course Name:
									</Typography>
									<Typography ml={5} variant="body2">
										{courseName}
									</Typography>

									<Typography color="black" variant="subtitle1">
										Description:
									</Typography>
									<Typography ml={5} variant="body2">
										{courseDesc}
									</Typography>

									<Typography color="black" variant="subtitle1">
										Topics:
									</Typography>
									<Box ml={4}>
										{topics?.map((curElem, ind) => {
											return (
												<Chip
													key={ind}
													sx={{ marginLeft: 1, marginBottom: 1 }}
													color="success"
													size="small"
													label={curElem.label}
													variant="outlined"
												/>
											);
										})}
									</Box>
									<Typography color="black" variant="subtitle1">
										Duration:
									</Typography>
									<Typography ml={5} variant="body2">
										{duration} week / weeks
									</Typography>
								</Grid>
								<Grid item mt={1} sm={6} xs={12} sx={{ wordWrap: "break-word" }}>
									<Typography color="black" variant="subtitle1">
										Course Outline:
									</Typography>
									{courseOutline?.map((curElem, ind) => {
										return (
											<Box key={ind}>
												<Typography color="black" ml={5} variant="body2">
													week {ind + 1}:
												</Typography>
												<Typography ml={9} variant="body1">
													{curElem.week}
												</Typography>
											</Box>
										);
									})}
									{/* <EditCourse curUser={curUser} /> */}
								</Grid>

							</Grid>
							<Box width="100%" display="flex" justifyContent="flex-end">
								<AddCourse
									curUser={curUser}
									editCourse={true}
									course={course}
									setSeverity={setSeverity}
									setOpenSnack={setOpenSnack}
								/>
								<Tooltip title="Go to This Course" arrow>
									<Button size="small" sx={{ borderRadius: 5 }} onClick={() => history.push(`/${course?._id}`)}><VscGoToFile size="22px" color="green" /></Button>
								</Tooltip>
							</Box>
						</Box>
					) : <Box pt={9} width="100%"
						textAlign="center"
					>
						<Typography variant="h6" color="green">
							Currently No Course Added
						</Typography>
					</Box>}
				</Box>
			</Box>
		</Box>
	);
};

export default CDTeacher;

