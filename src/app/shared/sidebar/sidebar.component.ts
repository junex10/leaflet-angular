import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  PERIMETERS_TYPE,
  fly
} from 'src/app/shared/shared.index';
import {
  PerimetersTypeDTO,
  DataMapDTO,
  PerimeterRegisterDTO
} from 'src/app/dtos/index.dto';
import { MapService } from 'src/app/services/index.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {

  @Input('map') map: any;
  @Input('openedModalDraw') openedModalDraw: boolean = false;
  @Input('dataMap') dataMap: DataMapDTO | {} = {};
  @Input('openModalListParameters') openModalListParameters: boolean = false;

  parametersType: PerimetersTypeDTO[] = PERIMETERS_TYPE;
  perimetersRegistered: any[] = [];

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    if (this.openedModalDraw) this.onShowClosed();
  }

  openDraw = () => this.openedModalDraw = true;

  openList = () => {
    this.getPerimeters();
    this.openModalListParameters = true;
  }

  onShowClosed = () => this.openedModalDraw = false;

  onListPerimetersClosed = () => this.openModalListParameters = false;

  getPerimeters = () => {
    this.perimetersRegistered.push(this.mapService.getDataMap().perimeters?.perimetersRegistered);
    this.perimetersRegistered = this.perimetersRegistered[0];
  }
}
