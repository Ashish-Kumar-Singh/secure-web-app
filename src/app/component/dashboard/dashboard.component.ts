import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public reviewList: Review [] = [];

  public movieName: string = '';
  public genre: string = '';
  public review: string = '';
  public rating: string = '';

  constructor(private auth:AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.auth.getUserId();
    this.getAllReviews();
  }

  public signout():void{
    this.auth.logout();
  }

  public canUserDelete(review:Review):boolean{
    const userId = this.auth.userId;
    return review.User == userId;
  }

  private getAllReviews():void {
    this.dataService.getAllReviews().subscribe((data:any) => {
      this.reviewList = data.map((object: any) => {
      const reviewData = object.payload.doc.data();
      reviewData.id = object.payload.doc.id;
      return reviewData;
      })
    }, (error:any) => {
      console.log(error);
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

  public deleteReview(review: Review): void{
    //Add confirmation
    this.dataService.deleteReview(review);
  }

}
