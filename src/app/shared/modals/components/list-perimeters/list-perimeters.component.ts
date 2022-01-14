import { Component, OnChanges, Input, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { fly } from 'src/app/shared/shared.index';
import { PerimeterRegisterDTO, CoordinatesDTO } from 'src/app/dtos/index.dto';
@Component({
  selector: 'app-list-perimeters',
  templateUrl: './list-perimeters.component.html',
  styleUrls: ['./list-perimeters.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListPerimetersComponent implements OnChanges {

  @Input('header') header: string = 'Lista de perimetros';
  @Input('content') content: PerimeterRegisterDTO[] = [];
  @Input('show') show: boolean = false;
  @Input('map') map: any;

  modalRef: any;
  @ViewChild('listPerimeters') modal: any;

  @Output() openModalListParameters = new EventEmitter<void>();

  constructor(
    private modalService: ModalManager,
    private toast: ToastrService
  ) { }

  ngOnChanges(): void {
    if (this.show) setTimeout(() => this.openModal(), 100);
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
      this.openModalListParameters.emit();
    });
  }
  goFly = (coordinates: CoordinatesDTO, zoom: number = 10) => {
    fly(this.map, coordinates, zoom) // Change to calcule the center o polygon irregular
    this.toast.success('Perimetro localizado')
  }
}
