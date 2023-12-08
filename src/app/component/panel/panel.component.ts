import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() review: Review | undefined;

  @Input() canDelete: boolean = false;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  public deleteReview(): void{
    //Add confirmation
    if(this.review){
      this.dataService.deleteReview(this.review);
    }
  }

}
