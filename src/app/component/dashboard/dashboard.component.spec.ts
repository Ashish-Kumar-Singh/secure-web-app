import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const returnMockData = {
    data:'test'
  }
  const dataSpy = jasmine.createSpyObj({
    valueChanges: of(returnMockData)
  })
  
  const authSpy = jasmine.createSpyObj('AuthService', [
    'logout','userId','getUserId'
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
        {provide: DataService, useValue: dataStoreSpy},
        {provide:AuthService, useValue:authSpy}
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
});
