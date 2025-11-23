export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserPostRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserPostResponse {
  success: Boolean;
}
export interface BrandPostResponse {
  success: Boolean;
}
export interface UserPutRequest {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}
export interface UserPutResponse {
    success: Boolean;
}
export interface UserDeleteRequest {
    id: number;
}
export interface UserDeleteResponse {
    success: Boolean;
}