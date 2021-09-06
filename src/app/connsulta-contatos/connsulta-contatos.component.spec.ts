import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnsultaContatosComponent } from './connsulta-contatos.component';

describe('ConnsultaContatosComponent', () => {
  let component: ConnsultaContatosComponent;
  let fixture: ComponentFixture<ConnsultaContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnsultaContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnsultaContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
