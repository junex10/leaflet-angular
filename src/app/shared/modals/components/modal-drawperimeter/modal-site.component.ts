import { Component, Input, ViewChild, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import {
  PerimetersTypeDTO,
  DrawPerimeterDTO,
  PerimeterInProcessDTO,
  PerimeterRegisterDTO,
  CoordinatesDTO,
  DataMapDTO
} from 'src/app/dtos/index.dto';
import { MapService } from 'src/app/services/index.service';
import {
  drawPolyline,
  setMarker,
  swalAuthAction,
  resetMap,
  fly
} from 'src/app/shared/shared.index';
import Swal from 'sweetalert2';
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
  @Input('dataMap') dataMap: DataMapDTO = {};

  @Output() openedModalDraw = new EventEmitter<boolean>();

  modalRef: any;
  @ViewChild('modal') modal: any;

  modalIndicatorRef: any;
  @ViewChild('modalIndicator') modalIndicator: any;

  perimeterType: string = 'none';
  perimeterName: string = 'Nombre del perimetro';
  perimeterColor: string = '#000000';
  perimeterFillColor: string = '#000000';

  dataDraw: DrawPerimeterDTO | {} = {};

  drawWay: boolean = false;

  // Perimeter

  drawMarked: any[] = []; // Coordinates temporaly marked
  drawMarkedtmp: any;
  drawPolylinesRecorded: any[] = [];
  perimeterInProcess: PerimeterInProcessDTO = {};
  actualPointMarked: any[] = [];
  eventPerimeter: any = '';

  constructor(
    private modalService: ModalManager,
    private toast: ToastrService,
    private mapService: MapService
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
      this.openedModalDraw.emit(false);
    });
  }

  drawType = (draw: string) => {
    this.perimeterType = draw;
    switch (draw) {
      case 'polyline':
        this.toast.info('Ya puede comenzar a dibujar el perimetro');

        // Emit order to can draw in the map

        this.dataDraw = {
          perimeterType: 'polyline',
          draw: true
        };
        this.openModalIndicator();
        this.modalService.close(this.modalRef);
        this.polyline();
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
      this.openedModalDraw.emit(false);

      this.drawWay == false ? this.toast.info('Ha cancelado para dibujar el perimetro') : this.toast.success('Ha registrado el nuevo perimetro');
      this.drawWay = false;

      this.reset();

      /*this.map.removeLayer(this.perimeterInProcess.perimeter);
      this.perimeterInProcess.markers?.map(m => this.map.removeLayer(m));*/
    });
  }

  closeModalIndicator = () => this.modalService.close(this.modalIndicatorRef);

  polyline = () => {
    this.eventPerimeter = this.map.on('click', (e: any) => {
      const coordinates: CoordinatesDTO = { lat: e.latlng.lat, long: e.latlng.lng };
      this.drawMarked.push([coordinates.lat, coordinates.long]);

      this.drawMarkedtmp = drawPolyline(this.map, this.drawMarked, '#000000');
      const markedDraw = setMarker(this.map, coordinates.lat, coordinates.long);
      markedDraw.bindPopup(`Coordenadas: ${coordinates.lat} - ${coordinates.long}`);
      this.actualPointMarked.push(markedDraw);

      this.actualPointMarked[0].bindPopup(`<b>Punto inicial</b>`).openPopup();
      this.actualPointMarked[0].on('click', () => {
        Swal.fire(swalAuthAction('¿Desea confirmar el perimetro?', 'Confirmar', 'Cancelar'))
          .then(() => this.registerDraw())
      })

      this.drawMarkedtmp.then((polylines: any) => {
        this.drawPolylinesRecorded.push(polylines);
        if (this.drawPolylinesRecorded.length > 0) {
          this.drawPolylinesRecorded.map((lines: any, index: any) => {
            if (index !== this.drawPolylinesRecorded.length - 1) {
              this.map.removeLayer(lines);
            } else {
              this.perimeterInProcess = {
                perimeter: lines,
                perimeterType: 'polyline',
                markers: this.actualPointMarked
              };
            }
          })
        }
      });
    });
  }

  registerDraw = () => {
    const perimeterRegister: PerimeterRegisterDTO = {
      perimeterType: this.perimeterType,
      perimeter: this.perimeterName,
      perimeterColor: this.perimeterColor,
      perimeterCoordinates: this.drawMarked,
      perimeterFillColor: this.perimeterFillColor
    };
    if (perimeterRegister.perimeterCoordinates.length > 0) {
      this.dataMap.perimeters?.perimetersRegistered?.push(perimeterRegister);
      this.mapService.putDataMap(this.dataMap);
    }
    this.drawWay = true;
    this.closeModalIndicator();
    this.reset();
  }

  reset = () => {
    this.drawPolylinesRecorded.forEach((lines: any) => this.map.removeLayer(lines));
    this.drawPolylinesRecorded = [];

    this.actualPointMarked.forEach((points: any) => this.map.removeLayer(points));
    this.actualPointMarked = [];

    this.drawMarked = [];

    this.map.remove(this.eventPerimeter);
    this.map = resetMap();

  }
  goFly = (map: any, coordinates: CoordinatesDTO, zoom: number = 10) => fly(map, coordinates, zoom)
}
