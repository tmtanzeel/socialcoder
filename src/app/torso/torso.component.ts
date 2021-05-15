import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-torso',
  templateUrl: './torso.component.html',
  styleUrls: ['./torso.component.css']
})
export class TorsoComponent implements OnInit {

  supportLanguages =['en-us', 'fr', 'hi'];

  constructor(private translateService: TranslateService) { 
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en-us');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang);
  }


  ngOnInit() {
  }

}
