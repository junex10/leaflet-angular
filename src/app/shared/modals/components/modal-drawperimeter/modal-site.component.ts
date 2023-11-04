import { Component, Input, ViewChild, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { MODAL_CONFIG } from 'src/app/shared/commons/config';
import {
  drawPolyline,
  setMarker,
  swalAuthAction,
  resetMap,
  fly,
  showPerimeters,
  clearMap
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
  @Output() hideSideBar = new EventEmitter<boolean>();

  modalRef: any;
  @ViewChild('modal') modal: any;

  modalIndicatorRef: any;
  @ViewChild('modalIndicator') modalIndicator: any;

  colorPickerRef: any
  @ViewChild('colorPicker') colorPicker: any;

  dataDraw: DrawPerimeterDTO | {} = {};

  drawWay: boolean = false;

  // Perimeter

  drawMarked: any[] = []; // Coordinates temporaly marked
  drawMarkedtmp: any;
  drawPolylinesRecorded: any[] = [];
  perimeterInProcess: PerimeterInProcessDTO = {};
  actualPointMarked: any[] = [];
  eventPerimeter: any = '';

  form: FormGroup;

  colorType: string = 'point';
  openedColorPicker: boolean = false;

  constructor(
    private modalService: ModalManager,
    private toast: ToastrService,
    private mapService: MapService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      perimeterType: [null, [
        Validators.required,
        Validators.pattern(/\.*[A-Z]/)
      ]],
      perimeterName: [null, [
        Validators.required,
        Validators.pattern(/\.*[A-Z]/)
      ]],
      perimeterColor: [null, [
        Validators.required,
        Validators.pattern(/\.*[A-Z]/)
      ]],
      perimeterFillColor: [null, [
        Validators.required,
        Validators.pattern(/\.*[A-Z]/)
      ]]
    })
  }

  ngOnChanges() {
    if (this.show) setTimeout(() => this.openModal(), 100);
  }

  openColorPicker = (colorType: string) => {
    this.colorPickerRef = this.modalService.open(this.colorPicker, MODAL_CONFIG.MEDIUM);
    this.colorType = colorType;
    this.openedColorPicker = true;
  }

  openModal = () => {
    this.modalRef = this.modalService.open(this.modal, MODAL_CONFIG.MEDIUM);
    this.modalRef.onClose.subscribe(() => {
      this.show = false;
      this.openedModalDraw.emit(false);
    });
  }

  drawType = (draw: string) => {
    this.form.get('perimeterType')?.setValue(draw);
    switch (draw) {
      case 'polyline':
        clearMap(this.map);
        this.toast.info('You can draw the perimeter');

        // Emit order to can draw in the map

        this.dataDraw = {
          perimeterType: 'polyline',
          draw: true
        };
        this.openModalIndicator();
        this.modalService.close(this.modalRef);
        this.polyline();
        this.hideSideBar.emit(false);
      break;
    }
  }

  openModalIndicator = () => {
    this.modalIndicatorRef = this.modalService.open(this.modalIndicator, MODAL_CONFIG.MEDIUM)
    this.modalIndicatorRef.onClose.subscribe(() => {
      this.show = false;
      this.openedModalDraw.emit(false);

      this.drawWay == false ? this.toast.info('You canceled the perimeter') : this.toast.success('Perimeter created');
      this.drawWay = false;

      this.reset();
      this.hideSideBar.emit(true);
      if (this.openedColorPicker) this.closeModalColorPicker();
    });
  }

  closeModalIndicator = () => this.modalService.close(this.modalIndicatorRef);
  closeModalColorPicker = () => {
    this.modalService.close(this.colorPickerRef);
    this.openedColorPicker = false;
  }

  polyline = () => {
    this.eventPerimeter = this.map.on('click', (e: any) => {
      const coordinates: CoordinatesDTO = { lat: e.latlng.lat, long: e.latlng.lng };
      this.drawMarked.push([coordinates.lat, coordinates.long]);

      this.drawMarkedtmp = drawPolyline(this.map, this.drawMarked, '#000000');
      const markedDraw = setMarker(this.map, coordinates.lat, coordinates.long);
      markedDraw.bindPopup(`Coordinates: ${coordinates.lat} - ${coordinates.long}`);
      this.actualPointMarked.push(markedDraw);

      this.actualPointMarked[0].bindPopup(`<b>Punto inicial</b>`).openPopup();
      this.actualPointMarked[0].on('click', () => {
        if (this.actualPointMarked.length >= 3) Swal.fire(swalAuthAction('Are you sure to generate the perimeter?', 'Confirm', 'Cancel'))
          .then(way => way.isConfirmed ? this.registerDraw() : null);
        else this.toast.error(`You must to mark at least 3 points on the map to generate the perimeter`)
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

    const perimeters = this.mapService.getDataMap().perimeters?.perimetersRegistered;
    showPerimeters(this.map, perimeters); // Loads all perimeters
    
    this.form.reset();
  }
  goFly = (map: any, coordinates: CoordinatesDTO, zoom: number = 10) => fly(map, coordinates, zoom)

  colorSelected = ($event: any) => {
    this.form.get(`${$event?.colorType === 'point' ? 'perimeterColor' : 'perimeterFillColor'}`)?.setValue($event?.color);
    this.closeModalColorPicker();
  }

  get perimeterType() { return this.form.get('perimeterType')?.value; }
  get perimeterName() { return this.form.get('perimeterName')?.value; }
  get perimeterColor() { return this.form.get('perimeterColor')?.value; }
  get perimeterFillColor() { return this.form.get('perimeterFillColor')?.value; }
}
