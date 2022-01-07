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
  drawMarked: any[] = []; // Coordinates temporaly marked
  drawMarkedtmp: any;
  drawPolylinesRecorded: any[] = [];

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
    switch (this.actualActionInMap) {
      case 'none':
        // Set actual coordenates
        break;
      case 'polyline':
        // Obtain actually coordinate to clicked
        this.map.on('click', (e: any) => {
          if (this.countActionsDraw == 1) {
            const coordinates: CoordinatesDTO = { lat: e.latlng.lat, long: e.latlng.lng };
            this.drawMarked.push([coordinates.lat, coordinates.long]);

            this.drawMarkedtmp = drawPolyline(this.map, this.drawMarked, '#000000');
            const marker = setMarker(this.map, coordinates.lat, coordinates.long);
            
            this.drawMarkedtmp.then((polylines: any) => {
              this.drawPolylinesRecorded.push(polylines);
              if (this.drawPolylinesRecorded.length > 0) {
                this.drawPolylinesRecorded.map((lines: any, index: any) => {
                  if (index !== this.drawPolylinesRecorded.length-1) {
                    this.map.removeLayer(lines);
                  }
                })
              }
            })

            this.countActionsDraw++;
            this.countActionsDraw = 0;
          }
        });
        break;
    }

  }
}
