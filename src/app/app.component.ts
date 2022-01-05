import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {
  MAP_LAYER,
  MAP_OPTIONS,
  swalErrorLocation
} from 'src/app/shared/shared.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'map-leaflet';
  sidebar: boolean = false;

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
}
