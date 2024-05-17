import { ChangeDetectorRef, Component } from '@angular/core';
import { TngConfigService, TngModalService } from '@triercloud/trier-ng';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TngModalService],
})
export class AppComponent {
  readonly isFrameModal: boolean;

  constructor(tngModalService: TngModalService, tngConfigService: TngConfigService, cdr: ChangeDetectorRef) {
    this.isFrameModal = tngModalService.checkFrameModal();
    tngConfigService.configure(packageJson.name, cdr, tngModalService);
  }
}
