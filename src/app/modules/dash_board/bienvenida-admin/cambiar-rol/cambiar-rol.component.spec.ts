import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarRolComponent } from './cambiar-rol.component';

describe('CambiarRolComponent', () => {
  let component: CambiarRolComponent;
  let fixture: ComponentFixture<CambiarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
