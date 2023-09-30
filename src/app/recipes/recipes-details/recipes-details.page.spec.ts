import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesDetailsPage } from './recipes-details.page';

describe('RecipesDetailsPage', () => {
  let component: RecipesDetailsPage;
  let fixture: ComponentFixture<RecipesDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
