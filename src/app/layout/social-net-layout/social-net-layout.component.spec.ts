import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetLayoutComponent } from './social-net-layout.component';

describe('SocialNetLayoutComponent', () => {
  let component: SocialNetLayoutComponent;
  let fixture: ComponentFixture<SocialNetLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialNetLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
