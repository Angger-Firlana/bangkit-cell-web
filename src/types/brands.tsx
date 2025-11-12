export interface Brand{
    id:number;
    nama:string;
    negara_asal:string;
    created_at:string;
    updated_at:string;
}

export interface BrandPostRequest{
    nama:string;
    negara_asal:string;
}

export interface BrandPostResponse{
    success:Boolean
}

export interface BrandPutRequest{
    id:number;
    nama:string;
    negara_asal:string;
}

export interface BrandPutResponse{
    success:Boolean
}

export interface BrandDeleteRequest{
    id:number;
}

export interface BrandDeleteResponse{
    success:Boolean
}
