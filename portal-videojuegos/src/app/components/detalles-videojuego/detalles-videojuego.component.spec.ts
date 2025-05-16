import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesVideojuegoComponent } from './detalles-videojuego.component';

describe('DetallesVideojuegoComponent', () => {
  let component: DetallesVideojuegoComponent;
  let fixture: ComponentFixture<DetallesVideojuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesVideojuegoComponent]
    });
    fixture = TestBed.createComponent(DetallesVideojuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
