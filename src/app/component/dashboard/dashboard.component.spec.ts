import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormsModule } from '@angular/forms';
import { Review } from 'src/app/model/review';
import { LoggerService } from 'src/app/shared/logger.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const returnMockData = {
    data:'test'
  }
  
  const authSpy = jasmine.createSpyObj('AuthService', [
    'logout','userId','getUserId'
  ])

  const logSpy = jasmine.createSpyObj('LoggerService', [
    'info','warn','error'
  ])


  const dataStoreSpy = jasmine.createSpyObj('DataService', [
    'getAllReviews',
    'addReview',
    'deleteReview'
  ])

  dataStoreSpy.getAllReviews.and.returnValue(of({returnMockData}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {provide: LoggerService, useValue: logSpy},
        {provide: DataService, useValue: dataStoreSpy},
        {provide:AuthService, useValue:authSpy},
      ],
      imports:[FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return hasHtml tags as true if html tag found', () => {
    component.genre = "<p>hello</p>"
    component.onUserInput();
    expect(component.hasHtmlTags).toBe(true)
  });
  it('should return hasHtml tags as false if no html tag found', () => {
    component.genre = "hello"
    component.onUserInput();
    expect(component.hasHtmlTags).toBe(false)
  });

  it('should allow user to delete data if they are the owner', () => {
    authSpy.userId = ('123')
    const review: Review = {
      User: '123',
      id: '',
      movieName: '',
      genre: '',
      review: '',
      rating: ''
    };
    const result = component.canUserDelete(review);
    expect(result).toBe(true);
  });

  it('should not allow user to delete data if they are not the owner', () => {
    authSpy.userId = ('1234')
    const review: Review = {
      User: '123',
      id: '',
      movieName: '',
      genre: '',
      review: '',
      rating: ''
    };
    const result = component.canUserDelete(review);
    expect(result).toBe(false);
  });
  it('should run input vlidation before submitting', () => {
    authSpy.userId = ('1234')
    component.genre = "sci-fi"
    component.movieName = "sci-fi"
    component.review = "sci-fi"
    component.rating = "sci-fi"
    component.addReview();
    expect(component.hasHtmlTags).toBe(false)
    expect(dataStoreSpy.addReview).toHaveBeenCalled();
    expect(dataStoreSpy.addReview).toHaveBeenCalledWith({
      User: '1234',
      id: '',
      movieName: 'sci-fi',
      genre: 'sci-fi',
      review: 'sci-fi',
      rating: 'sci-fi'
    });
  });

  it('should show warning if a feild is empty', () => {
    authSpy.userId = ('1234')
    component.genre = ""
    component.movieName = "sci-fi"
    component.review = "sci-fi"
    component.rating = "sci-fi"
    component.addReview();
    expect(component.hasHtmlTags).toBe(false)
    expect(component.message).toBe( "Feilds cannot be empty");
  });
});
