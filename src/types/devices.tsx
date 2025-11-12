export interface Device {
    id: number;
    brand_id: number;
    model: string;
    tipe: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface DeviceGetResponse{
    data: Device[];
}

export interface DevicePostRequest{
    brand_id: number;
    model: string;
    tipe: string;
}

export interface DevicePostResopnse{
    success:Boolean
}

export interface DevicePustRequest{
    id:number;
    brand_id: number;
    model: string;
    tipe: string;
}

export interface DevicePustResopnse{
    success:Boolean
}   

export interface DeviceDeleteRequest{
    id:number;
}

export interface DeviceDeleteResponse{
    success:Boolean
}

