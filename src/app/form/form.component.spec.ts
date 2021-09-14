import { TestBed, async } from '@angular/core/testing';
import { FormComponent } from './form.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'public-web'`, () => {
    const fixture = TestBed.createComponent(FormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('public-web');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(FormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to public-web!');
  });
});
