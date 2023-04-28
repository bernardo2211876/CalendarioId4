import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeletrabalhoComponent } from './teletrabalho.component';

describe('TeletrabalhoComponent', () => {
  let component: TeletrabalhoComponent;
  let fixture: ComponentFixture<TeletrabalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeletrabalhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeletrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
