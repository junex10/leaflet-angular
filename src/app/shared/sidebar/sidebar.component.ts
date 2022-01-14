import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  PERIMETERS_TYPE,
  fly
} from 'src/app/shared/shared.index';
import {
  PerimetersTypeDTO,
  DataMapDTO
} from 'src/app/dtos/index.dto';

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

  parametersType: PerimetersTypeDTO[] = PERIMETERS_TYPE;

  constructor(
  ) { }

  ngOnInit(): void {
    if (this.openedModalDraw) this.onShowClosed();
  }

  openDraw = () => this.openedModalDraw = true;

  openList = () => {
      /*`<hr>
        <div class='row listOfParameterBox'>
          <div class='col-12 listParameter' (click)='goFly()'>
            <span class='mr-4'><i class="fas fa-map-marker"></i></span> Perimetro
          </div>
          <div class='col-12 listParameter'>
            <span class='mr-4'><i class="fas fa-map-marker"></i></span> Perimetro
          </div>
        </div>
      `*/
  }

  onShowClosed = () => this.openedModalDraw = false;
  goFly = () => console.log('Hola')

}
