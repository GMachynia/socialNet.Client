import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SnTextareaComponent } from './component/sn-textarea/sn-textarea.component';
import { UserImagePopUpComponent } from './component/user-image-pop-up/user-image-pop-up.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [SnTextareaComponent, UserImagePopUpComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    isolate: false
  })
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    SnTextareaComponent
  ]
})
export class SharedModule { 
}

