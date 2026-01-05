import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTiponovedadComponent } from './abm-tiponovedad.component';

describe('AbmTiponovedadComponent', () => {
  let component: AbmTiponovedadComponent;
  let fixture: ComponentFixture<AbmTiponovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmTiponovedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmTiponovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
