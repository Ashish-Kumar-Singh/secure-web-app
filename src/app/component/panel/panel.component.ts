import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';
import { DataService } from 'src/app/shared/data.service';
import { LoggerService } from 'src/app/shared/logger.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  @Input() review: Review | undefined;

  @Input() canDelete: boolean = false;

  public editReview: string = '';

  public isEditable:boolean = false;

  public deletePanel:boolean = false;

  public hasHtmlTags:boolean = false;

  constructor(private dataService:DataService, private logger:LoggerService, private utils:Utils,) { }

  public showDeletePanel():void{
    this.deletePanel = !this.deletePanel;
  }

  public enableEdit():void{
    this.isEditable = !this.isEditable;
    this.hasHtmlTags = false;
  }

  public updateReview():void{
    this.onUserInput();
    if(!this.hasHtmlTags){
      if(this.review && this.editReview.length > 0){
        this.logger.info("Updating record")
        this.review.review = this.editReview;
        this.dataService.updateReview(this.review);  
    }
    }
  }

  public onUserInput(){
    this.hasHtmlTags = this.utils.hasHTMLTags(this.editReview);
  }

  public deleteReview(): void{
    //Add confirmation
    if(this.review){
      this.logger.info("Deleting record")
      this.dataService.deleteReview(this.review);
    }
  }

}
