import type { DateValue } from "@heroui/react";

export interface MarsRoverPhoto {
    id: number;
    sol: number;
    camera: {
        name: string;
        full_name: string;
        rover_id: number;
        id: number;
    };
    img_src: string;
    earth_date: string;
    rover: {
        id: number;
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
    };
}

export interface MarsRoverManifest {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: Array<{
        sol: number;
        total_photos: number;
        cameras: string[];
    }>;
}

export interface MarsRoverParams {
    rover?: 'curiosity' | 'opportunity' | 'spirit';
    camera?: string;
    sol?: number;
    earth_date?: DateValue;
    earth_date_string?: string;
    page?: number;
}