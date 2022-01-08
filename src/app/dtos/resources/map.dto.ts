export interface DataMapDTO{
    perimeters?: PerimetersDTO;
}
export interface PerimetersDTO{
    perimetersRegistered?: PerimetersRegisteredDTO[];
}
export interface PerimetersRegisteredDTO{
    perimeter: any;
    perimeterType: string;
}