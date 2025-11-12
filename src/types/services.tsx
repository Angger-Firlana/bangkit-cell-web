import type { Service } from "./index";

export interface ServicePostRequest
{
    nama:String,
    deskripsi:String
}

export interface ServicePutRequest
{
    nama:String,
    deskripsi:String
}

export interface ServiceDeleteRequest
{
    id:number
}

export interface ServiceGetRequest
{
    id:number
}

export interface ServicePostResponse{
    success:Boolean,
    data:Service
}

export interface ServicePutResponse{
    success:Boolean,
    data:Service
}

export interface ServiceDeleteResponse{
    success:Boolean,
    data:Service
}

export interface ServiceGetResponse{
    success:Boolean,
    data:Service
}
