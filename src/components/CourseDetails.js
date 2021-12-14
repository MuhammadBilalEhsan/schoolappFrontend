import React from "react";
import { useSelector } from "react-redux";
import CDTeacher from "./CDTeacher";
import CDStudent from "./CDStudent";

const CourseDetails = ({ curUser, setAuth }) => {

	const course = useSelector((state) => state.usersReducer.course);
	const courses = useSelector((state) => state.usersReducer.studentCourse);



	if (curUser.roll === "teacher") {
		return <CDTeacher curUser={curUser} course={course} setAuth={setAuth} />;
	} else {
		return <CDStudent curUser={curUser} courses={courses} setAuth={setAuth} />;
	}
};

export default CourseDetails;
