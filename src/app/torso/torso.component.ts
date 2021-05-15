import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-torso',
  templateUrl: './torso.component.html',
  styleUrls: ['./torso.component.css']
})
export class TorsoComponent implements OnInit {

  supportLanguages =['en-US', 'de-DE', 'ar-AE', 'fr', 'hi'];

  constructor(private translateService: TranslateService) { 
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en-US');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(navigator.language);
  }


  ngOnInit() {
  }

}
