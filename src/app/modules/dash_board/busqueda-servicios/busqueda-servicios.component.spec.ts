import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaServiciosComponent } from './busqueda-servicios.component';

describe('BusquedaServiciosComponent', () => {
  let component: BusquedaServiciosComponent;
  let fixture: ComponentFixture<BusquedaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusquedaServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
