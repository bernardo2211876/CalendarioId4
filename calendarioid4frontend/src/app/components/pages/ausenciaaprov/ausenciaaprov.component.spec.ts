import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciaaprovComponent } from './ausenciaaprov.component';

describe('AusenciaaprovComponent', () => {
  let component: AusenciaaprovComponent;
  let fixture: ComponentFixture<AusenciaaprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusenciaaprovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AusenciaaprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
