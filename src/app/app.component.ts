import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {
  MAP_LAYER,
  MAP_OPTIONS
} from 'src/app/shared/shared.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'map-leaflet';
  private map: any;
  private mapOptions: L.MapOptions = {
    center: [ 39.8282, -98.5795 ],
    zoom: 5
  };
  private initMap(): void {
    this.map = L.map('map', this.mapOptions);

    const tiles = L.tileLayer(MAP_LAYER, MAP_OPTIONS);

    tiles.addTo(this.map);
  }
  constructor() {

  }
  ngAfterViewInit(): void {
    this.initMap();
  }
}
