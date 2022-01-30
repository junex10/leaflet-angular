import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnChanges {

  formPicker: FormGroup;
  @Output() colorSelected = new EventEmitter<Object>();
  @Input('colorType') colorType: string = '';

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService
  ) { 
    this.formPicker = this.fb.group({
      colorPicker: [null, Validators.required]
    })
  }

  ngOnChanges(): void {
  }

  handleChangeComplete = ($e: any) => this.formPicker.get('colorPicker')?.setValue($e.color.hex);
  submit = () => {
    if (!this.formPicker.invalid) this.colorSelected.emit({ color: this.colorPicker, colorType: this.colorType });
    else this.toast.error('Debe seleccionar un color primero')
  }

  get colorPicker() { return this.formPicker.get('colorPicker')?.value; }
}
