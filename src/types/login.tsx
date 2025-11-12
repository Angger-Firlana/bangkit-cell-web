export interface LoginResponse{
    status:Boolean,
    message:String,
    token:String,
    data:User
}

export interface User{
    id:number,
    name:String,
    email:String,
    role:String,
    created_at:String,
    updated_at:String
}