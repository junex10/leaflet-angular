import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngb-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorSketchModule } from 'ngx-color/sketch';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ModalSiteComponent } from './shared/modals/components/modal-drawperimeter/modal-site.component';
import { ListPerimetersComponent } from './shared/modals/components/list-perimeters/list-perimeters.component';
import { ColorPickerComponent } from './shared/modals/components/color-picker/color-picker.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ModalSiteComponent,
    ListPerimetersComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    }),
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    ColorSketchModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class AppModule { }
