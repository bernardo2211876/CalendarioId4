import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasaprovComponent } from './feriasaprov.component';

describe('FeriasaprovComponent', () => {
  let component: FeriasaprovComponent;
  let fixture: ComponentFixture<FeriasaprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriasaprovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriasaprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
