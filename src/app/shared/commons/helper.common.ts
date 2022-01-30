import * as L from "leaflet";
import {
    CoordinatesDTO
} from 'src/app/dtos/index.dto';
import {
    MAP_LAYER,
    MAP_OPTIONS_LAYER,
    MAP_OPTIONS
} from 'src/app/shared/shared.index';

/**
* 
* @param {array[latitud, longitud]} coord 
* @param {string} color 
*/

export const drawPolyline = async (map: any, coord: L.LatLngExpression[] | L.LatLngExpression[][], color: string = '#000000') =>
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

/**
*   @function reset map 
*/
export const resetMap = () => {
    const map: any = L.map('map', MAP_OPTIONS)
    .locate({ setView: true, maxZoom: 10 });

    const tiles = L.tileLayer(MAP_LAYER, MAP_OPTIONS_LAYER);
    tiles.addTo(map);

    return map;
};
/**
* @param {array[latitud, longitud]} coord 
* @param {string} color
* @param {string} fillColor   
*/
export const drawPolygon = async (map: any, coord: L.LatLngExpression[] | L.LatLngExpression[][], color: string = '#000000', fillColor: string = '#000000') =>
    L.polygon(coord, { color: color, fillColor: fillColor }).addTo(map);

/**
* @function translate perimeter type 
*/
export const translatePerimeterType = (perimeterType: string = 'none') => {
    switch(perimeterType){
        case 'polyline':
            perimeterType = '<i class="fas fa-draw-polygon"></i> Polígono';
        break;
    }
    return perimeterType;
}
/**
*   @function showAllPerimeters on the map
*/
export const showPerimeters = (map: any, perimeters: any) => {
    perimeters?.forEach((values: any) => {
        switch(values.perimeterType) {
          case 'polyline':
            const polygon = drawPolygon(map, values.perimeterCoordinates, values.perimeterColor, values.perimeterFillColor);
            polygon.then(self => {
              self.bindPopup(`<b>Perimetro:</b> ${values.perimeter}<br><b>Tipo:</b> ${translatePerimeterType(values.perimeterType)}`)
            })
          break;
        }
      });
}