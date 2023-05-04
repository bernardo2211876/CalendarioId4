import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdausenciaComponent } from './modaladdausencia.component';

describe('ModaladdausenciaComponent', () => {
  let component: ModaladdausenciaComponent;
  let fixture: ComponentFixture<ModaladdausenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdausenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdausenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
