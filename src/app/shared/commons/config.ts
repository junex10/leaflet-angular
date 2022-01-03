import {
    TileLayerOptions
} from 'leaflet';

export const MAP_LAYER = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}';
export const MAP_OPTIONS: TileLayerOptions = {
    maxZoom: 18,
    minZoom: 3
};