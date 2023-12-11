import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public reviewList: Review [] = [];

  public userList: Review [] = [];

  public movieName: string = '';
  public genre: string = '';
  public review: string = '';
  public rating: string = '';

  public hasHtmlTags:boolean =false;

  constructor(private auth:AuthService,
     private dataService: DataService,
     private utils:Utils) { }

  ngOnInit(): void {
    this.auth.getUserId();
    this.getAllReviews();
  }

  public signout():void{
    console.log("Logging user out")
    this.auth.logout();
  }

  public canUserDelete(review:Review):boolean{
    const userId = this.auth.userId;
    return review.User == userId;
  }

  public onUserInput(){
    this.hasHtmlTags = this.utils.hasHTMLTags(this.movieName) ||
    this.utils.hasHTMLTags(this.genre) ||this.utils.hasHTMLTags(this.review)
  }

  private mapData(data:any):void{
    this.reviewList = data.map((object: any) => {
      const reviewData = object.payload.doc.data();
      reviewData.id = object.payload.doc.id;
      return reviewData;
    })
  }

  private getUserReviews(data:any):void {
    this.userList = data.filter((object: any) => {
      const reviewData = object.payload.doc.data();
      reviewData.id = object.payload.doc.id;
      return reviewData.User == this.auth.userId
    }).map((object:any) => {
      const userData = object.payload.doc.data();
      userData.id = object.payload.doc.id;
      return userData
    })
  }

  private getAllReviews():void {
    this.dataService.getAllReviews().subscribe((data:any) => {
      if(data){
        this.getUserReviews(data)
        this.mapData(data);
      }
    }, (error:any) => {
      console.error(error);
    })
  }

  private resetForm(): void{
    this.movieName= '';
       this.genre = '';
       this.review = '';
       this.rating = '';
  }

  public addReview(): void{
    //Add form check
    this.onUserInput();
    if(!this.hasHtmlTags){
      this.dataService.addReview({
        movieName: this.movieName,
        genre: this.genre,
        review: this.review,
        rating: this.rating,
        User: this.auth.userId ?? '',
        id: ''
      });
      this.resetForm();
    }
    else{
      console.warn("Invalid HTML tags found in input");
    }
  }

  public deleteReview(review: Review): void{
    //Add confirmation
    this.dataService.deleteReview(review);
  }

}
