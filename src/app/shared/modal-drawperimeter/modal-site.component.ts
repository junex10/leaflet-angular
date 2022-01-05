import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { PerimetersTypeDTO } from 'src/app/dtos/index.dto';
import {
  drawPolyline,
  fly
} from 'src/app/shared/shared.index';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.css']
})
export class ModalSiteComponent implements OnInit {

  @Input('header') header: string = 'Modal';
  @Input('content') content: PerimetersTypeDTO[] = [];
  @Input('map') map: any;

  modalRef: any;
  @ViewChild('modal') modal: any;

  constructor(
    private modalService: ModalManager
  ) {
  }

  ngOnInit() {
    setTimeout(() => this.openModal(), 100);
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
  }

  drawType = (draw: string) => {
    switch(draw) {
      case 'polyline':
        drawPolyline(this.map, [[33.77210225140211, -90.1383973658523], [31.384411061334625, -91.07298428459194]], '#000000')
        fly(this.map, { lat: 33.77210225140211, long: -90.1383973658523 }, 10);
        console.log(this.map);
        this.modalService.close(this.modal);
      break;
    }
  }

}
