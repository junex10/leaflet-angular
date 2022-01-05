import { Component, OnInit, ViewEncapsulation, Output, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {
  swalListPerimeter,
  swalListTypeParameter
} from 'src/app/shared/shared.index';
import { ToastrService } from 'ngx-toastr';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {

  @Output('perimeter') perimeter: string = '';
  openedModalDraw: boolean = false;

  constructor(
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  openDraw = () => {
    // Begin draw
    //this.toast.info('Dibujado', 'Ya puede comenzar a dibujar el parametro');

    // Open swettalert to set type parameter
    /*Swal.fire(
      swalListTypeParameter()
    )*/
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

  perimeterDraw = (perimeter: string) => {
    this.perimeter = perimeter;
    console.log(this.perimeter)
  }

  openModal = () => {
    this.openedModalDraw = true;
  }

}
