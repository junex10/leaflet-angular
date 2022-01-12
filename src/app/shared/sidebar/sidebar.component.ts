import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import {
  swalListPerimeter,
  PERIMETERS_TYPE
} from 'src/app/shared/shared.index';
import {
  PerimetersTypeDTO,
  DrawPerimeterDTO,
  PerimeterInProcessDTO,
  PerimeterRegisterDTO
} from 'src/app/dtos/index.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {

  @Output() activatedDraw = new EventEmitter<DrawPerimeterDTO>();
  @Output() resetListCoordenates = new EventEmitter<any[]>();
  @Output() registerNewDraw = new EventEmitter<PerimeterRegisterDTO>();

  @Input('map') map: any;
  @Input('listCoordenatesSelected') listCoordenatesSelected: any[] = [];
  @Input('perimeterInProcess') perimeterInProcess: PerimeterInProcessDTO = {};
  @Input('confirmDraw') confirmDraw: boolean = false;

  openedModalDraw: boolean = false;
  parametersType: PerimetersTypeDTO[] = PERIMETERS_TYPE;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  openDraw = () => {
    // Begin draw
    //this.toast.info('Dibujado', 'Ya puede comenzar a dibujar el parametro');

    // Open modal to set type parameter
  
    this.openModal();
  }

  openList = () => {
    Swal.fire(
      swalListPerimeter(`<hr>
        <div class='row listOfParameterBox'>
          <div class='col-12 listParameter'>
            <span class='mr-4'><i class="fas fa-map-marker"></i></span> Perimetro
          </div>
          <div class='col-12 listParameter'>
            <span class='mr-4'><i class="fas fa-map-marker"></i></span> Perimetro
          </div>
        </div>
      `)
    )
  }

  openModal = () => {
    this.openedModalDraw = true;
    // Show options to stop the draw
    
  }

  onShowClosed = () => this.openedModalDraw = false;

  canDraw = ($event: DrawPerimeterDTO) => this.activatedDraw.emit($event);

  newListCoordenatesSelected = ($event: any[]) => this.resetListCoordenates.emit($event);
  registerNewDrawSend = ($event: PerimeterRegisterDTO) => this.registerNewDraw.emit($event);
}
