import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerimetersComponent } from './list-perimeters.component';

describe('ListPerimetersComponent', () => {
  let component: ListPerimetersComponent;
  let fixture: ComponentFixture<ListPerimetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerimetersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerimetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
