import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeletrabalhoaprovComponent } from './teletrabalhoaprov.component';

describe('TeletrabalhoaprovComponent', () => {
  let component: TeletrabalhoaprovComponent;
  let fixture: ComponentFixture<TeletrabalhoaprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeletrabalhoaprovComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeletrabalhoaprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
