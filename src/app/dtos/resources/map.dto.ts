export interface DataMapDTO{
    perimeters?: PerimetersDTO;
}
export interface PerimetersDTO{
    perimetersRegistered?: PerimetersRegisteredDTO[];
}
export interface PerimetersRegisteredDTO{
    perimeterName?: string;
    perimeterType: string;
    perimeterColor?: string;
    perimeterCoordinates: any[];
}