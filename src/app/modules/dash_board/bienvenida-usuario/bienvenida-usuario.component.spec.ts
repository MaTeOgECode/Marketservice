import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaUsuarioComponent } from './bienvenida-usuario.component';

describe('BienvenidaUsuarioComponent', () => {
  let component: BienvenidaUsuarioComponent;
  let fixture: ComponentFixture<BienvenidaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
