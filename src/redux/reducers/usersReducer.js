const initialState = {
  users: [],
  curUser: {},
  course: {},
  studentCourse: [],
  currentCourse: null,
  currentAssignment: null,
  allAssignments: null,
  checkedAssignments: null,
  allConversations: [],
  currentConversation: null,
  allCourses: []
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "CUR_USER":
      return { ...state, curUser: action.payload };
    case "GET_COURSE":
      return { ...state, course: action.payload };
    case "GET_Student_COURSES":
      return { ...state, studentCourse: action.payload };
    case "EDIT_AVAILABLE_COURSES":
      let findAlready = state.studentCourse?.find(course => course._id === action.payload._id)
      if (!findAlready) {
        return { ...state, studentCourse: [...state.studentCourse, action.payload] };
      } else {
        return state;
      }
    case "UPDATE_COURSES":
      let findCourse = state.studentCourse.find(course => course._id === action.payload._id)
      if (findCourse) {
        findCourse = action.payload
        const filterOther = state.studentCourse.filter(course => course._id !== action.payload._id)
        const newArr = [...filterOther, findCourse]
        return { ...state, studentCourse: newArr };
      } else {
        return state
      }
    case "CURRENT_COURSE":
      return { ...state, currentCourse: action.payload }
    case "UPDATE_CURRENT_COURSE":
      if (state.currentCourse && state.currentCourse._id === action.payload._id) {
        return { ...state, currentCourse: action.payload }
      } else {
        return state
      }
    case "ALL_ASSIGNMENTS":
      return { ...state, allAssignments: action.payload };
    case "CURRENT_ASSIGNMENT":
      return { ...state, currentAssignment: action.payload };
    case "CHECKED_ASSIGNMENTS":
      return { ...state, checkedAssignments: action.payload };
    case "UPDATE_ALL_ASSIGNMENTS":
      if (state.allAssignments && state.allAssignments[0].courseID === action.payload[0].courseID) {
        return { ...state, allAssignments: action.payload }
      } else {
        return state
      }
    case "ALL_CONVERSATIONS":
      return { ...state, allConversations: action.payload };
    case "CURRENT_CONVERSATION":
      return { ...state, currentConversation: action.payload };
    case "UPDATE_CURRENT_CONVERSATION":
      let filter = state.allConversations?.filter(convers => convers._id !== action.payload._id)
      if (state.currentConversation?._id === action.payload._id) {
        return { ...state, allConversations: [...filter, action.payload], currentConversation: action.payload }
      } else {
        return { ...state, allConversations: [...filter, action.payload] }
      }
    case "ALL_COURSES":
      return { ...state, allCourses: action.payload }
    case "ADD_NEW_COURSE_FOR_ADMIN":
      let findCourseAdmin = state.allCourses.find(course => course._id === action.payload._id)
      if (!findCourseAdmin) {
        state.allCourses.push(action.payload)
        return state
      } else {
        return state
      }
    case "USER_ADDED":
      let findUser = state.users?.find(user => user._id === action.payload)
      if (!findUser) {
        let newUsersArray = [...state.users, action.payload]
        return { ...state, users: newUsersArray }
      } else {
        return state
      }
    case "UPDATE_SINGLE_USER":
      let newUsers = []
      const abc = state.users.filter(user => {
        if (user._id === action.payload._id) {
          newUsers.push(action.payload)
        } else {
          newUsers.push(user)
        }
      })
      return { ...state, users: newUsers };
    case "LOG_OUT":
      return state = initialState;
    default:
      return state;
  }
};

export default usersReducer;
