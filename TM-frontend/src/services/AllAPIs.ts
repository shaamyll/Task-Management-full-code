import {serverURL} from './serverURL';
import {commonAPI} from './commonAPI'



export const registerAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/register`, reqBody)
}


export const loginAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/login`, reqBody)
}


export const getAllTasksAPI   = async (reqHeader:any) => {
    return await commonAPI('get', `${serverURL}/api/task/getAllTasks`, null, reqHeader)
}


export const fetchAllUsersAPI   = async (reqHeader:any) => {
    return await commonAPI('get', `${serverURL}/api/auth/allUsers`, null, reqHeader)
}

export const deleteUserAPI   = async (userId:number,reqHeader:any) => {
    return await commonAPI('get', `${serverURL}/api/auth/allUsers/${userId}`, null, reqHeader)
}



