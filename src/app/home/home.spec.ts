import { TestBed } from '@angular/core/testing';
import { STUDENTS } from '../students/student';
import { Home } from './home';

describe('Home', () => {
  async function render() {
    await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    return fixture;
  }

  it('lists every student', async () => {
    const fixture = await render();
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(STUDENTS.length);
  });

  it('filters the table as the user types and shows an empty state', async () => {
    const fixture = await render();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;

    input.value = STUDENTS[0].lastName;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    const filtered = el.querySelectorAll('tbody tr');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.length).toBeLessThan(STUDENTS.length);
    expect(el.textContent).toContain(STUDENTS[0].lastName);

    input.value = 'no such advisee';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(el.textContent).toContain('No advisees match your search.');
  });
});
