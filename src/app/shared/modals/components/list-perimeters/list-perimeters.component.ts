import { Component, OnChanges, Input, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { 
  fly,
  resetMap,
  showPerimeters,
  clearMap
} from 'src/app/shared/shared.index';
import { PerimeterRegisterDTO, CoordinatesDTO, DataMapDTO } from 'src/app/dtos/index.dto';
import { MODAL_CONFIG } from 'src/app/shared/commons/config';
import { MapService } from 'src/app/services/index.service';
@Component({
  selector: 'app-list-perimeters',
  templateUrl: './list-perimeters.component.html',
  styleUrls: ['./list-perimeters.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListPerimetersComponent implements OnChanges {

  @Input('header') header: string = 'Perimeters List';
  @Input('content') content: PerimeterRegisterDTO[] = [];
  @Input('show') show: boolean = false;
  @Input('map') map: any;

  modalRef: any;
  @ViewChild('listPerimeters') modal: any;

  @Output() openModalListParameters = new EventEmitter<void>();

  dataMap: DataMapDTO = {};

  constructor(
    private modalService: ModalManager,
    private toast: ToastrService,
    private mapService: MapService
  ) {
    this.dataMap = this.mapService.getDataMap();
  }

  ngOnChanges(): void {
    if (this.show) setTimeout(() => this.openModal(), 100);
  }

  openModal = () => {
    this.modalRef = this.modalService.open(this.modal, MODAL_CONFIG.MEDIUM);
    this.modalRef.onClose.subscribe(() => {
      this.show = false;
      this.openModalListParameters.emit();
    });
  }
  goFly = (coordinates: CoordinatesDTO, zoom: number = 10) => {
    fly(this.map, coordinates, zoom) // Change to calcule the center o polygon irregular
    this.toast.success('Perimeter located')
  }

  removePerimeter = (perimeter: any, index: number) => {
    this.dataMap.perimeters?.perimetersRegistered?.splice(index, 1);
    this.mapService.putDataMap(this.dataMap);
    
    this.map.remove();
    this.map = resetMap();

    const perimeters = this.mapService.getDataMap().perimeters?.perimetersRegistered;
    showPerimeters(this.map, perimeters); // Loads all perimeters

    this.modalService.close(this.modal);
  }
}
