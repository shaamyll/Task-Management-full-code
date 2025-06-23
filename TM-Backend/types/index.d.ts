
declare namespace Express {
    export interface Request {
        user: import("../interfaces/auth.Interface").UserData
    }
}