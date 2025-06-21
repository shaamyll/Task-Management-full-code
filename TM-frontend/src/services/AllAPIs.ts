import {serverURL} from './serverURL';
import {commonAPI} from './commonAPI'



export const registerAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/register`, reqBody)
}


export const loginAPI   = async (reqBody: any) => {
    return await commonAPI('post', `${serverURL}/api/auth/login`, reqBody)
}




