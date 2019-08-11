import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagresultsComponent } from './tagresults.component';

describe('TagresultsComponent', () => {
  let component: TagresultsComponent;
  let fixture: ComponentFixture<TagresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
