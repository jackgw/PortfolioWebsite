import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralizedApiDetailsComponent } from './generalized-api.component';

describe('GeneralizedApiDetailsComponent', () => {
  let component: GeneralizedApiDetailsComponent;
  let fixture: ComponentFixture<GeneralizedApiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralizedApiDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralizedApiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
