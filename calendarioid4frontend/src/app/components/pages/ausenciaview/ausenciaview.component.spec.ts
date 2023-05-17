import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciaviewComponent } from './ausenciaview.component';

describe('AusenciaviewComponent', () => {
  let component: AusenciaviewComponent;
  let fixture: ComponentFixture<AusenciaviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusenciaviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AusenciaviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
