import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadeServiciosComponent } from './listade-servicios.component';

describe('ListadeServiciosComponent', () => {
  let component: ListadeServiciosComponent;
  let fixture: ComponentFixture<ListadeServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadeServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadeServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
