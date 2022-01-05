import {
    TileLayerOptions
} from 'leaflet';
import { 
    PerimetersTypeDTO
} from 'src/app/dtos/index.dto';
import * as L from 'leaflet';

export const MAP_LAYER = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
export const MAP_OPTIONS: TileLayerOptions = {
    maxZoom: 18,
    minZoom: 3
};
export const PERIMETERS_TYPE: PerimetersTypeDTO[] = [
    {
        perimeter: 'Circular',
        icon: 'far fa-circle',
        key: 'circle' 
    },
    {
        perimeter: 'Poligono',
        icon: 'fas fa-draw-polygon',
        key: 'polyline'
    }
];