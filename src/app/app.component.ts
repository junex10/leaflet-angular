import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {
  MAP_LAYER,
  MAP_OPTIONS,
  swalErrorLocation,
  drawPolyline,
  fly,
  setMarker
} from 'src/app/shared/shared.index';
import {
  DrawPerimeterDTO,
  CoordinatesDTO
} from 'src/app/dtos/index.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'map-leaflet';
  sidebar: boolean = false;

  actualActionInMap: string = 'none';

  openDrawPerimeter: boolean = false;

  countActionsDraw = 0;
  drawMarked = [{}]; // Coordinates temporaly marked -> Solved lenght - as object empty

  public map: any;
  private mapOptions: L.MapOptions = {
    zoom: 10,
    attributionControl: false
  };
  constructor(
  ) { }
  private initMap(): void {
    const map: any = L.map('map', this.mapOptions)
      .locate({ setView: true, maxZoom: 10 });

    map.on("locationerror", () =>
      Swal.fire(swalErrorLocation())
        .then(() => window.location.href = 'https://www.google.com/')
    )
    map.on("locationfound", () => this.sidebar = true)

    this.map = map;

    const tiles = L.tileLayer(MAP_LAYER, MAP_OPTIONS);
    tiles.addTo(this.map);
  }
  ngOnInit(): void {
    this.initMap();
  }

  draw = ($event: DrawPerimeterDTO) => {
    this.actualActionInMap = $event.perimeterType;
    this.openDrawPerimeter = $event.draw;
  }

  actionMap = () => {
    this.countActionsDraw = 1;
    // Actions in the map
    switch(this.actualActionInMap) {
      case 'none':
        // Set actual coordenates
      break;
      case 'polyline':
        // Obtain actually coordinate to clicked
        this.map.on('click', (e: any) => {
          if (this.countActionsDraw == 1) {
            const coordinates: CoordinatesDTO = { lat: e.latlng.lat, long: e.latlng.lng };
            this.drawMarked.push([ coordinates.lat, coordinates.long ]);
            console.log(this.drawMarked);
            //drawPolyline(this.map, [[33.77210225140211, -90.1383973658523], [31.384411061334625, -91.07298428459194]], '#000000') -> Crear un helper para esto
            this.countActionsDraw++;
            this.countActionsDraw = 0;
          }
        });
        //drawPolyline(this.map, [[33.77210225140211, -90.1383973658523], [31.384411061334625, -91.07298428459194]], '#000000')
        /*fly(this.map, { lat: 33.77210225140211, long: -90.1383973658523 }, 10);*/
        //setMarker(this.map, 33.77210225140211, -90.1383973658523);
      break;
    }
    
  }
}
