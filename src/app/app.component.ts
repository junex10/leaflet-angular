import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import {
  MAP_LAYER,
  MAP_OPTIONS_LAYER,
  MAP_OPTIONS,
  swalErrorLocation,
  drawPolygon,
  translatePerimeterType
} from 'src/app/shared/shared.index';
import {
  DataMapDTO,
  PerimeterInProcessDTO
} from 'src/app/dtos/index.dto';
import {
  MapService
} from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'map-leaflet';
  dataMap: DataMapDTO = {};

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
  confirmDraw: boolean = false;

  // Draw output

  @Output() drawMarkedComunicate = new EventEmitter<any[]>();

  // Control to show perimeters, locations and others

  @Input('showControl') showControl: boolean = false;

  public map: any;
  constructor(
    private mapService: MapService,
    private toast: ToastrService
  ) {
    this.dataMap = this.mapService.getDataMap();
  }
  private initMap(): void {
    if (window.localStorage.getItem('dataMap') === null) window.localStorage.setItem('dataMap', JSON.stringify(this.dataMap));

    const map: any = L.map('map', MAP_OPTIONS)
      .locate({ setView: true, maxZoom: 10 });

    map.on("locationerror", () =>
      Swal.fire(swalErrorLocation())
        .then(() => window.location.href = 'https://www.google.com/')
    )
    map.on("locationfound", () => this.sidebar = true);

    this.map = map;

    const tiles = L.tileLayer(MAP_LAYER, MAP_OPTIONS_LAYER);
    tiles.addTo(this.map);
  }
  ngOnInit(): void {
    this.initMap();
    this.showPerimeters(); // Loads all perimeters
    this.toast.info('Se ha cargado el mapa correctamente')
  }

  showPerimeters = () => {
    const perimeters = this.mapService.getDataMap().perimeters?.perimetersRegistered;
    perimeters?.forEach(values => {
      switch(values.perimeterType) {
        case 'polyline':
          const polygon = drawPolygon(this.map, values.perimeterCoordinates, values.perimeterColor, values.perimeterFillColor);
          polygon.then(self => {
            self.bindPopup(`<b>Perimetro:</b> ${values.perimeter}<br><b>Tipo:</b> ${translatePerimeterType(values.perimeterType)}`)
          })
        break;
      }
    });
  }
}
