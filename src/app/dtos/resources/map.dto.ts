import {
    PerimeterRegisterDTO
} from 'src/app/dtos/index.dto';
export interface DataMapDTO{
    perimeters?: PerimetersDTO;
}
export interface PerimetersDTO{
    perimetersRegistered?: PerimeterRegisterDTO[];
}