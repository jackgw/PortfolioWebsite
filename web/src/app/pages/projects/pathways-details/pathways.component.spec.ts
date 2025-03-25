import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwaysDetailsComponent } from './pathways.component';

describe('PathwaysDetailsComponent', () => {
  let component: PathwaysDetailsComponent;
  let fixture: ComponentFixture<PathwaysDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathwaysDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathwaysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
