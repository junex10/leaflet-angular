import { Component, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { MapService } from 'src/app/services/index.service';
import { fly } from 'src/app/shared/shared.index';
import { PerimeterRegisterDTO } from 'src/app/dtos/index.dto';
@Component({
  selector: 'app-list-perimeters',
  templateUrl: './list-perimeters.component.html',
  styleUrls: ['./list-perimeters.component.css']
})
export class ListPerimetersComponent implements OnChanges {

  @Input('header') header: string = 'Lista de perimetros';
  @Input('content') content: PerimeterRegisterDTO[] = [];
  @Input('show') show: boolean = false;

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
}
