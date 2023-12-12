import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';
import { DataService } from 'src/app/shared/data.service';
import { Review } from 'src/app/model/review';
import { LoggerService } from 'src/app/shared/logger.service';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  const dataStoreSpy = jasmine.createSpyObj('DataService', [
    'deleteReview'
  ])

  const logSpy = jasmine.createSpyObj('LoggerService', [
    'info','warn','error'
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelComponent ],
      providers: [
        {provide: LoggerService, useValue: logSpy},
        {provide: DataService, useValue: dataStoreSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete Review', () => {
    component.review = {} as Review;
    component.deleteReview();
    expect(dataStoreSpy.deleteReview).toHaveBeenCalled();
    expect(dataStoreSpy.deleteReview).toHaveBeenCalledWith({});
  });
});
