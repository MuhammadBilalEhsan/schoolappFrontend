export const getUsers = data => {
  return {
    type: "GET_USERS",
    payload: data,
  };
};
export const curUserFun = data => {
  return {
    type: "CUR_USER",
    payload: data,
  };
};
export const getCourseFunc = data => {
  return {
    type: "GET_COURSE",
    payload: data,
  };
};
export const getStudentCourseFunc = data => {
  return {
    type: "GET_Student_COURSES",
    payload: data,
  };
};
export const logoutFunc = () => {
  return {
    type: "LOG_OUT"
  }
}
export const updateCourses = (data) => {
  return {
    type: "UPDATE_COURSES",
    payload: data
  }
}
export const currentCourseFunc = (data) => {
  return {
    type: "CURRENT_COURSE",
    payload: data
  }
}
export const updateCurrentCourse = (data) => {
  return {
    type: "UPDATE_CURRENT_COURSE",
    payload: data
  }
}
export const settingAssignments = (data) => {
  return {
    type: "ALL_ASSIGNMENTS",
    payload: data
  }
}
export const updateAllAssignments = (data) => {
  return {
    type: "UPDATE_ALL_ASSIGNMENTS",
    payload: data
  }
}
export const editAvailAbleCourses = (data) => {
  return {
    type: "EDIT_AVAILABLE_COURSES",
    payload: data
  }
}
export const currentAssignmentRedux = (data) => {
  return {
    type: "CURRENT_ASSIGNMENT",
    payload: data
  }
}
export const checkedAssignmentsRedux = (data) => {
  return {
    type: "CHECKED_ASSIGNMENTS",
    payload: data
  }
}
