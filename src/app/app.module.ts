import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from 'src/app/components/components.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngb-modal';
import { ModalsModule } from './shared/modals/modals.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ModalSiteComponent } from './shared/modals/modal-drawperimeter/modal-site.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ModalSiteComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    }),
    ModalModule,
    ModalsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
