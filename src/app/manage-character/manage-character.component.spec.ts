import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCharacterComponent } from './manage-character.component';

describe('ManageCharacterComponent', () => {
  let component: ManageCharacterComponent;
  let fixture: ComponentFixture<ManageCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
