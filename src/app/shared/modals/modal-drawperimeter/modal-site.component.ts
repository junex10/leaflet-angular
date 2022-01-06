import { Component, Input, ViewChild, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { PerimetersTypeDTO } from 'src/app/dtos/index.dto';
import {
  drawPolyline,
  fly,
  setMarker
} from 'src/app/shared/shared.index';
import * as L from 'leaflet';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ModalSiteComponent implements OnChanges {

  @Input('header') header: string = 'Modal';
  @Input('content') content: PerimetersTypeDTO[] = [];
  @Input('map') map: any;
  @Input('show') show: boolean = false;

  @Output() newShow = new EventEmitter<boolean>();

  modalRef: any;
  @ViewChild('modal') modal: any;

  modalIndicatorRef: any;
  @ViewChild('modalIndicator') modalIndicator: any;

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
        /*drawPolyline(this.map, [[33.77210225140211, -90.1383973658523], [31.384411061334625, -91.07298428459194]], '#000000')
        fly(this.map, { lat: 33.77210225140211, long: -90.1383973658523 }, 10);*/
        //setMarker(this.map, 33.77210225140211, -90.1383973658523);
        //this.modalIndicatorShow = true;
        this.openModalIndicator();
        this.modalService.close(this.modalRef)
        break;
    }
  }

  openModalIndicator = () => {
    this.modalIndicatorRef = this.modalService.open(this.modalIndicator, {
      size: "md",
      modalClass: 'sideModal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "none",
    })
  }
}
