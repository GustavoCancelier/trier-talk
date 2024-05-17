import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilhoSecundarioComponent } from './filho-secundario.component';
import { DataService } from '../../services/data.service';

@NgModule({
  declarations: [FilhoSecundarioComponent],
  imports: [CommonModule],
  exports: [FilhoSecundarioComponent],
  providers: [DataService],
})
export class FilhoSecundarioModule {}
