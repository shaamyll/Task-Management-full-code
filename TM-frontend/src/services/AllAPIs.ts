import {serverURL} from './serverURL';
import {commonAPI} from './commonAPI'



export const registerAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/register`,null, reqBody)
}


export const loginAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/login`, reqBody)
}



export const fetchAllUsersAPI   = async (reqHeader:any) => {
    return await commonAPI('get', `${serverURL}/api/allUsers`, null, reqHeader)
}

//Create user API
export const createUserAPI   = async (reqBody: any,reqHeader:any) => {
    return await commonAPI('post', `${serverURL}/api/createUser`, reqBody,reqHeader)
}

export const deleteUserAPI   = async (userId:number,reqHeader:any) => {
    return await commonAPI('delete', `${serverURL}/api/deleteUser/${userId}`, null, reqHeader)
}


export const getAllTasksAPI   = async (reqHeader:any) => {
    return await commonAPI('get', `${serverURL}/api/task/getAllTasks`, null, reqHeader)
}


