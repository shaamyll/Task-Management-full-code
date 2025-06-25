import {serverURL} from './serverURL';
import {commonAPI} from './commonAPI'



export const registerAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/register`, reqBody)
}


export const loginAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/login`, reqBody)
}


//Fetch all users
export const fetchAllUsersAPI   = async (filters:any,reqHeader:any) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await commonAPI('get', `${serverURL}/api/allUsers?${queryParams}`, null, reqHeader)
}

//Create user API
export const createUserAPI   = async (reqBody: any,reqHeader:any) => {
    return await commonAPI('post', `${serverURL}/api/createUser`, reqBody,reqHeader)
}

//Update user
export const updateUserAPI   = async (userId:any,reqBody: any,reqHeader:any) => {
    return await commonAPI('put', `${serverURL}/api/updateUser/${userId}`, reqBody,reqHeader)
}


export const deleteUserAPI   = async (userId:number,reqHeader:any) => {
    return await commonAPI('delete', `${serverURL}/api/deleteUser/${userId}`, null, reqHeader)
}

//Create Task
export const createTaskAPI   = async (reqBody:any,reqHeader:any) => {
    return await commonAPI('post', `${serverURL}/api/task/createTask`, reqBody, reqHeader)
}


//Fetch All Tasks
export const getAllTasksAPI = async (filters: any, reqHeader: any) => {
  // Remove null/undefined values from filters
  const sanitizedFilters:any = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== null && v !== undefined)
  );
  const queryParams = new URLSearchParams(sanitizedFilters).toString();
  return await commonAPI(
    'get',`${serverURL}/api/task/getAllTasks?${queryParams}`,null,reqHeader);
};

//Delete Task
export const deleteTaskAPI   = async (taskId:number,reqHeader:any) => {
    return await commonAPI('delete', `${serverURL}/api/deleteTask/${taskId}`, null, reqHeader)
}


//Update Task
export const updateTaskAPI   = async (taskId:any,reqBody: any,reqHeader:any) => {
    return await commonAPI('put', `${serverURL}/api/updateTask/${taskId}`,reqBody,reqHeader)
}


