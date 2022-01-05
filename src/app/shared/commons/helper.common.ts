import * as L from "leaflet";
import {
    CoordinatesDTO
} from 'src/app/dtos/index.dto';
/**
* 
* @param {array[latitud, longitud]} coord 
* @param {string} color 
*/

export const drawPolyline = async (map: any, coord: L.LatLngExpression[] | L.LatLngExpression[][], color: string) => 
    L.polyline(coord, {color: color}).addTo(map);

/**
* 
* @param {array} [latitud, longitud] // Coordenadas 
* @param {number} zoom // Zooom
*/
export const fly = async (map: any, coordinates: CoordinatesDTO, zoom: number) => 
    map.flyTo([coordinates.lat, coordinates.long], zoom);