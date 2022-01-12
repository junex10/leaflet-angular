import { Component, Input, ViewChild, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { 
  PerimetersTypeDTO,
  DrawPerimeterDTO,
  PerimeterInProcessDTO,
  PerimeterRegisterDTO
} from 'src/app/dtos/index.dto';

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
  @Input('listCoordenatesSelected') listCoordenatesSelected: any[] = [];
  @Input('perimeterInProcess') perimeterInProcess: PerimeterInProcessDTO = {};
  @Input('confirmDraw') confirmDraw: boolean = false;

  @Output() newShow = new EventEmitter<boolean>();
  @Output() canDraw = new EventEmitter<DrawPerimeterDTO>();
  @Output() newListCoordenatesSelected = new EventEmitter<any[]>();
  @Output() registerNewDraw = new EventEmitter<PerimeterRegisterDTO>();

  modalRef: any;
  @ViewChild('modal') modal: any;

  modalIndicatorRef: any;
  @ViewChild('modalIndicator') modalIndicator: any;

  drawWay: boolean = false;
  perimeterType: string = 'none';
  perimeterName: string = 'Nombre del perimetro';
  perimeterColor: string = '#000000';

  constructor(
    private modalService: ModalManager,
    private toast: ToastrService
  ) {
  }

  ngOnChanges() {
    if (this.show) {
      setTimeout(() => this.openModal(), 100);
    }
    if (this.confirmDraw === true) this.registerDraw();
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
    this.perimeterType = draw;
    switch (draw) {
      case 'polyline':
        this.toast.info('Ya puede comenzar a dibujar el perimetro');
        
        // Emit order to can draw in the map
        
        this.canDraw.emit({
          perimeterType: 'polyline',
          draw: true
        });
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
    this.modalIndicatorRef.onClose.subscribe(() => {
      this.show = false;
      this.canDraw.emit({
        perimeterType: 'none',
        draw: false
      });

      this.listCoordenatesSelected = [];
      this.newListCoordenatesSelected.emit(this.listCoordenatesSelected);
      this.map.removeLayer(this.perimeterInProcess.perimeter);
      this.perimeterInProcess.markers?.map(m => this.map.removeLayer(m));

      this.drawWay == false ? this.toast.info('Ha cancelado para dibujar el perimetro') : this.toast.success('Ha registrado el nuevo perimetro');
      this.drawWay = false;
    });
  }

  closeModalIndicator = () => 
    this.modalService.close(this.modalIndicatorRef);

  registerDraw = () => {
    const perimeterRegister: PerimeterRegisterDTO = {
      perimeterType: this.perimeterType,
      perimeter: this.perimeterName,
      perimeterColor: this.perimeterColor,
      perimeterCoordinates: this.listCoordenatesSelected
    };
    this.drawWay = true;
    this.closeModalIndicator();
    this.registerNewDraw.emit(perimeterRegister);
  }
}
