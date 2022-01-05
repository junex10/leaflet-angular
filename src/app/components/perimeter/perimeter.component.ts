import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-perimeter',
  templateUrl: './perimeter.component.html',
  styleUrls: ['./perimeter.component.css']
})
export class PerimeterComponent implements OnInit {

  @Input('perimeter') perimeter: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
