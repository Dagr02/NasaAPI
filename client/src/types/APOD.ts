export type APOD = {
    date: string;
    title: string;
    explanation: string;
    hdurl: string;
    url: string;
    media_type: "image" | "video";
    service_version: string;
    copyright?: string;
}

export type APODParams = {
    date?: string;
    start_date?: string;
    end_date?: string;
    count?: number;
}