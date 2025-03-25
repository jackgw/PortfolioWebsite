import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialValidDetailsComponent } from './social-valid.component';

describe('SocialValidDetailsComponent', () => {
  let component: SocialValidDetailsComponent;
  let fixture: ComponentFixture<SocialValidDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialValidDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialValidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
