import { Injectable } from '@angular/core';
import {
  DataMapDTO
} from 'src/app/dtos/index.dto';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: DataMapDTO = {
    perimeters: {
      perimetersRegistered: []
    }
  };

  constructor() { }

  getDataMap = (): DataMapDTO => JSON.parse(window.localStorage.getItem('dataMap') || `${JSON.stringify(this.map)}`);
 
}
