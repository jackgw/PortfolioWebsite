import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailsComponent } from './portfolio.component';

describe('PortfolioDetailsComponent', () => {
  let component: PortfolioDetailsComponent;
  let fixture: ComponentFixture<PortfolioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
