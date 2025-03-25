import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmDetailsComponent } from './pfm.component';

describe('PfmDetailsComponent', () => {
  let component: PfmDetailsComponent;
  let fixture: ComponentFixture<PfmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfmDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
