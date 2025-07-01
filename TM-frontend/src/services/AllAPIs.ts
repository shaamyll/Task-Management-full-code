import {serverURL} from './serverURL';
import {commonAPI} from './commonAPI';



export const registerAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/register`, reqBody)
}


export const loginAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/login`, reqBody)
}


//Fetch all users
export const fetchAllUsersAPI   = async (filters:any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await commonAPI('get', `${serverURL}/api/allUsers?${queryParams}`, null)
}

//Create user API
export const createUserAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/createUser`, reqBody)
}

//Update user
export const updateUserAPI   = async (userId:any,reqBody: any) => {
    return await commonAPI('put', `${serverURL}/api/updateUser/${userId}`, reqBody)
}


export const deleteUserAPI   = async (userId:number) => {
    return await commonAPI('delete', `${serverURL}/api/deleteUser/${userId}`, null)
}

//Create Task
export const createTaskAPI   = async (reqBody:any) => {
    return await commonAPI('post', `${serverURL}/api/task/createTask`, reqBody)
}


//Fetch All Tasks
export const getAllTasksAPI = async (filters: any) => {
  // Remove null/undefined values from filters
  const sanitizedFilters:any = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== null && v !== undefined)
  );
  const queryParams = new URLSearchParams(sanitizedFilters).toString();
  return await commonAPI(
    'get',`${serverURL}/api/task/getAllTasks?${queryParams}`,null);
};

//Delete Task
export const deleteTaskAPI   = async (taskId:number) => {
    return await commonAPI('delete', `${serverURL}/api/deleteTask/${taskId}`, null)
}


//Update Task
export const updateTaskAPI   = async (taskId:any,reqBody: any) => {
    return await commonAPI('put', `${serverURL}/api/updateTask/${taskId}`,reqBody)
}


//Assign task API
export const assignTaskAPI   = async (taskId:number,userId: number) => {
    return await commonAPI('patch', `${serverURL}/api/task/assignTask/${taskId}`,{ assignedTo:userId })
}


//Remove Assignments
export const removeAssignmentAPI = (taskId: number) => {
  return commonAPI('patch', `${serverURL}/api/task/removeAssignment/${taskId}`, {});
};


//fetch All Assigmnets
export const fetchAllAssignments = ( filters:any) => {
      const query = new URLSearchParams(filters).toString();
  return commonAPI('get', `${serverURL}/api/task/assignments?${query}`,null);
};


//fetch developers Assigmnets
export const fetchdeveloperTasksAPI = ( filters: any) => {
  const query = new URLSearchParams(filters).toString();
  return commonAPI('get', `${serverURL}/api/task/developersTasks?${query}`, null);
};



//Add comment API
export const addCommentAPI   = async (taskId:number,content: any) => {
    return await commonAPI('post', `${serverURL}/api/comment/create/${taskId}`, {content})
}


//delete comment API
export const deleteCommentAPI   = async (commentId:number) => {
    return await commonAPI('delete', `${serverURL}/api/comment/delete/${commentId}`, null)
}