import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmNovedadesDtiComponent } from './abm-novedades-dti.component';

describe('AbmNovedadesDtiComponent', () => {
  let component: AbmNovedadesDtiComponent;
  let fixture: ComponentFixture<AbmNovedadesDtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmNovedadesDtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmNovedadesDtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
