import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-project-mobile',
  templateUrl: './view-project-mobile.component.html',
  styleUrls: ['./view-project-mobile.component.scss']
})
export class ViewProjectMobileComponent {

  constructor(private route: ActivatedRoute) { }

}
