import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaProveedorComponent } from './bienvenida-proveedor.component';

describe('BienvenidaProveedorComponent', () => {
  let component: BienvenidaProveedorComponent;
  let fixture: ComponentFixture<BienvenidaProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidaProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
