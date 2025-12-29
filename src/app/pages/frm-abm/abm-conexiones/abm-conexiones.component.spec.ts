import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmConexionesComponent } from './abm-conexiones.component';

describe('AbmConexionesComponent', () => {
  let component: AbmConexionesComponent;
  let fixture: ComponentFixture<AbmConexionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmConexionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmConexionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
