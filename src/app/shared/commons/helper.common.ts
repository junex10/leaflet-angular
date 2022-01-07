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
    L.polyline(coord, { color: color }).addTo(map);

/**
* 
* @param {coordinates} {lat: number, long: number} // Coordenadas 
* @param {number} zoom // Zooom
*/
export const fly = async (map: any, coordinates: CoordinatesDTO, zoom: number) =>
    map.flyTo([coordinates.lat, coordinates.long], zoom);

/**
* 
* @param {number} lat // Coordenadas
* @param {number} long // Coordenadas
* @param {number} zoom // Zooom
*/
export const setMarker = (map: any, lat: any, long: any) =>
    L.marker([lat, long], {
        icon: L.divIcon({
            className: "pint",
            iconAnchor: [0, 24],
            popupAnchor: [0, -36],
            html: `<span class="pointMarker" />`
        })
    }).addTo(map);
