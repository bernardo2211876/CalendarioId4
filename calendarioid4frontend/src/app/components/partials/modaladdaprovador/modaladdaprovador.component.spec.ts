import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdaprovadorComponent } from './modaladdaprovador.component';

describe('ModaladdaprovadorComponent', () => {
  let component: ModaladdaprovadorComponent;
  let fixture: ComponentFixture<ModaladdaprovadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdaprovadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdaprovadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
