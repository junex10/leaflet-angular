import {
    TileLayerOptions
} from 'leaflet';
import { 
    PerimetersTypeDTO
} from 'src/app/dtos/index.dto';

export const MAP_LAYER = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
export const MAP_OPTIONS: TileLayerOptions = {
    maxZoom: 18,
    minZoom: 3
};
export const PERIMETERS_TYPE: PerimetersTypeDTO[] = [
    /*{
        perimeter: 'Circular',
        icon: 'far fa-circle',
        key: 'circle' 
    },*/
    {
        perimeter: 'Poligono',
        icon: 'fas fa-draw-polygon',
        key: 'polyline'
    }
];