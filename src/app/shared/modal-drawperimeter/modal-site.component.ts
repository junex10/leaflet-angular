import { Component, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { PerimetersTypeDTO } from 'src/app/dtos/index.dto';
import {
  drawPolyline,
  fly
} from 'src/app/shared/shared.index';
import * as L from 'leaflet';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.css']
})
export class ModalSiteComponent implements OnChanges {

  @Input('header') header: string = 'Modal';
  @Input('content') content: PerimetersTypeDTO[] = [];
  @Input('map') map: any;
  @Input('show') show: boolean = false;

  @Output() newShow = new EventEmitter<any>();

  modalRef: any;
  @ViewChild('modal') modal: any;

  constructor(
    private modalService: ModalManager,
    private toast: ToastrService
  ) {
  }

  ngOnChanges() {
    if (this.show) {
      setTimeout(() => this.openModal(), 100);
    }
  }

  openModal = () => {
    this.modalRef = this.modalService.open(this.modal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    });
    this.modalRef.onClose.subscribe(() => {
      this.show = false;
      this.newShow.emit(this.show);
    });
  }

  drawType = (draw: string) => {
    switch (draw) {
      case 'polyline':
        this.toast.info('Ya puede comenzar a dibujar el perimetro');
        drawPolyline(this.map, [[33.77210225140211, -90.1383973658523], [31.384411061334625, -91.07298428459194]], '#000000')
        fly(this.map, { lat: 33.77210225140211, long: -90.1383973658523 }, 10);
        L.marker([33.77210225140211, -90.1383973658523], {
          icon: L.divIcon({
            className: "pint",
            iconAnchor: [0, 24],
            popupAnchor: [0, -36],
            html: `<span class="pointMarker" />`
          })
        }).addTo(this.map);
        this.modalService.close(this.modalRef)
        break;
    }
  }
}
