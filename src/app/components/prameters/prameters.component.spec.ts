import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrametersComponent } from './prameters.component';

describe('PrametersComponent', () => {
  let component: PrametersComponent;
  let fixture: ComponentFixture<PrametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
