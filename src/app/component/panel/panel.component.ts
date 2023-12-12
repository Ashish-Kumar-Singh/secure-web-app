import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';
import { DataService } from 'src/app/shared/data.service';
import { LoggerService } from 'src/app/shared/logger.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  @Input() review: Review | undefined;

  @Input() canDelete: boolean = false;

  constructor(private dataService:DataService, private logger:LoggerService) { }

  public deleteReview(): void{
    //Add confirmation
    if(this.review){
      this.logger.info("Deleting record")
      this.dataService.deleteReview(this.review);
    }
  }

}
