import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import {
  swalListPerimeter,
  swalListTypeParameter
} from 'src/app/shared/shared.index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {

  constructor(
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    Swal.fire(
      swalListTypeParameter()
    )
  }

  openDraw = () => {
    // Begin draw
    //this.toast.info('Dibujado', 'Ya puede comenzar a dibujar el parametro');

    // Open swettalert to set type parameter
    Swal.fire(
      swalListTypeParameter()
    )
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

}
