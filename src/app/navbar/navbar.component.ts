import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../angularScriptDinamically.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dynamicScriptLoaderService: DynamicScriptLoaderService) {

  }

  ngOnInit() {
    this.loadScripts();
    this.loadCustomScript();
  }


  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoaderService.load('liveCounter').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }


  public loadCustomScript() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoaderService.load('customscript').then(data => {
      // Script Loaded Successfully
      console.log(data);
    }).catch(error => console.log(error));
  }

}
