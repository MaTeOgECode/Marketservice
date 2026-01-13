import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEmpresasComponent } from './seleccion-empresas.component';

describe('SeleccionEmpresasComponent', () => {
  let component: SeleccionEmpresasComponent;
  let fixture: ComponentFixture<SeleccionEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
