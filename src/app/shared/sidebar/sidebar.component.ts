import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  PERIMETERS_TYPE
} from 'src/app/shared/shared.index';
import {
  PerimetersTypeDTO,
  DataMapDTO
} from 'src/app/dtos/index.dto';
import { MapService } from 'src/app/services/index.service';
import { SIDEMENU } from '../commons/config';

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

  showMenu: boolean = true;
  showNav: boolean = false;

  menu: any = [];

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    if (this.openedModalDraw) this.onShowClosed();
    this.menu = SIDEMENU;
  }

  openDraw = () => this.openedModalDraw = true;

  openList = () => {
    this.getPerimeters();
    this.openModalListParameters = true;
  }

  onShowClosed = () => this.openedModalDraw = false;

  onListPerimetersClosed = () => {
    this.openModalListParameters = false;
    this.perimetersRegistered = [];
  }

  getPerimeters = () => {
    this.perimetersRegistered.push(this.mapService.getDataMap().perimeters?.perimetersRegistered);
    this.perimetersRegistered = this.perimetersRegistered[0];
  }

  hideSideBar = ($event: boolean) => this.showMenu = $event;

  launchWay = (action: string) => eval(`this.${action}`)

  menuToggle = () => this.showNav = !this.showNav
}
