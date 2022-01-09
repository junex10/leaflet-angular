import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  CoordinatesDTO,
  DataMapDTO,
  PerimetersDTO,
  PerimetersRegisteredDTO,
  PerimeterInProcessDTO,
  PerimeterRegisterDTO
} from 'src/app/dtos/index.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'map-leaflet';
  dataMap: DataMapDTO = {
    perimeters: {
      perimetersRegistered: []
    }
  };
  dataMapStorage: any = {};

  sidebar: boolean = false;

  actualActionInMap: string = 'none';

  openDrawPerimeter: boolean = false;

  // Perimeter

  countActionsDraw = 0;
  drawMarked: any[] = []; // Coordinates temporaly marked
  drawMarkedtmp: any;
  drawPolylinesRecorded: any[] = [];
  perimeterInProcess: PerimeterInProcessDTO = {};
  actualPointMarked: any[] = [];

  // Draw output

  @Output() drawMarkedComunicate = new EventEmitter<any[]>();

  public map: any;
  private mapOptions: L.MapOptions = {
    zoom: 10,
    attributionControl: false
  };
  constructor(
  ) { }
  private initMap(): void {
    if (window.localStorage.getItem('dataMap') === null) {
      window.localStorage.setItem('dataMap', JSON.stringify(this.dataMap));
    } else this.dataMapStorage = window.localStorage.getItem('dataMap');

    const map: any = L.map('map', this.mapOptions)
      .locate({ setView: true, maxZoom: 10 });

    map.on("locationerror", () =>
      Swal.fire(swalErrorLocation())
        .then(() => window.location.href = 'https://www.google.com/')
    )
    map.on("locationfound", () => this.sidebar = true);

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
        this.polyline(this.countActionsDraw);
        break;
    }
  }

  polyline = (count: number) => {
    this.map.on('click', (e: any) => {
      if (count == 1) {
        const coordinates: CoordinatesDTO = { lat: e.latlng.lat, long: e.latlng.lng };
        this.drawMarked.push([coordinates.lat, coordinates.long]);

        this.drawMarkedtmp = drawPolyline(this.map, this.drawMarked, '#000000');
        this.actualPointMarked.push(setMarker(this.map, coordinates.lat, coordinates.long));

        this.drawMarkedtmp.then((polylines: any) => {
          this.drawPolylinesRecorded.push(polylines);
          if (this.drawPolylinesRecorded.length > 0) {
            this.drawPolylinesRecorded.map((lines: any, index: any) => {
              if (index !== this.drawPolylinesRecorded.length - 1) {
                this.map.removeLayer(lines);
              } else {
                this.perimeterInProcess = {
                  perimeter: lines,
                  perimeterType: 'polyline',
                  markers: this.actualPointMarked
                };
              }
            })
          }
        });
        count++;
        count = 0;
      }
    });

  }
  resetListCoordenates = () => this.drawMarked = [];

  registerNewDraw = ($event: PerimeterRegisterDTO) => {
    const newPerimeter: PerimetersRegisteredDTO = {
      perimeterName: $event.perimeter,
      perimeterType: $event.perimeterType,
      perimeterColor: $event.perimeterColor,
      perimeterCoordinates: $event.perimeterCoordinates
    };
    this.dataMap.perimeters?.perimetersRegistered?.push(newPerimeter)
    this.dataMapStorage = this.dataMap
    window.localStorage.setItem("dataMap", JSON.stringify(this.dataMapStorage))
  }
}
