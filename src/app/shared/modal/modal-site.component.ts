import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.css']
})
export class ModalSiteComponent implements OnInit {

  @Input('header') header: string = 'Test';
  @Input('content') content: string = 'd';
  @Input('footer') footer: string = 'd';

  modalRef: any;
  @ViewChild('modal') modal: any;

  constructor(
    private modalService: ModalManager
  ) { 
  }

  ngOnInit() {
    setTimeout(() => this.openModal(), 100)
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

}
