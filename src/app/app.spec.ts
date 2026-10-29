import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('renders the navigation with both pages', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('a.nav-link'),
    ).map((a) => a.textContent?.trim());
    expect(links).toEqual(['Advisees', 'Grade Point Averages']);
  });

  it('toggles the collapsed menu', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const collapse = el.querySelector('#navbarSupportedContent') as HTMLElement;
    expect(collapse.classList.contains('show')).toBe(false);
    (el.querySelector('.navbar-toggler') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(collapse.classList.contains('show')).toBe(true);
  });
});
