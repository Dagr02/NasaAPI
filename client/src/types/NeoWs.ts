import type { DateValue } from "@heroui/react";

export interface NeoFeedResponse {
    element_count: number;
    near_earth_objects: Record<string, NeoObject[]>;
}

export interface NeoObject {
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
    close_approach_data: {
        close_approach_date: string;
        relative_velocity: {
            kilometers_per_hour: string;
        };
        miss_distance: {
            kilometers: string;
        };
    }[];
}

export interface NeoFiltersType {
    start_date?: DateValue | null; 
    start_date_string?: string;
    end_date?: DateValue | null;
    end_date_string?: string;
    minDiameter?: number;
    maxDiameter?: number;
    hazardousOnly?: boolean;
}