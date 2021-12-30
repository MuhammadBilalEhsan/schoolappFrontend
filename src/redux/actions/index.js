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
export const allConversationsRedux = (data) => {
  return {
    type: "ALL_CONVERSATIONS",
    payload: data
  }
}
export const currentConversationRedux = (data) => {
  return {
    type: "CURRENT_CONVERSATION",
    payload: data
  }
}
export const UpdatecurrentConversation = (data) => {
  return {
    type: "UPDATE_CURRENT_CONVERSATION",
    payload: data
  }
}
export const allCoursesRedux = (data) => {
  return {
    type: "ALL_COURSES",
    payload: data
  }
}
export const updateSingleUser = (user) => {
  return {
    type: "UPDATE_SINGLE_USER",
    payload: user
  }
}
export const addNewCourseForAdmin = (user) => {
  return {
    type: "ADD_NEW_COURSE_FOR_ADMIN",
    payload: user
  }
}
export const newUserAdded = (user) => {
  return {
    type: "USER_ADDED",
    payload: user
  }
}