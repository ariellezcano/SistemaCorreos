import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstReclamosComponent } from './lst-reclamos.component';

describe('LstReclamosComponent', () => {
  let component: LstReclamosComponent;
  let fixture: ComponentFixture<LstReclamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstReclamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
