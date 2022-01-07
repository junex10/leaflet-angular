import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import {
  swalListPerimeter,
  swalListTypeParameter,
  PERIMETERS_TYPE
} from 'src/app/shared/shared.index';
import {
  PerimetersTypeDTO,
  DrawPerimeterDTO
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

  @Input('map') map: any;
  @Input('listCoordenatesSelected') listCoordenatesSelected: any[] = [];

  openedModalDraw: boolean = false;
  parametersType: PerimetersTypeDTO[] = PERIMETERS_TYPE;

  constructor(
    private toast: ToastrService
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

  onShowClosed = ($event: boolean) => this.openedModalDraw = false;

  canDraw = ($event: DrawPerimeterDTO) => this.activatedDraw.emit($event);
}
