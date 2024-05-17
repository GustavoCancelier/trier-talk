import { NgModule } from '@angular/core';
import { TngRootModule } from '@triercloud/trier-ng';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [TngRootModule.forRoot('/trier-talk/', environment), AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
