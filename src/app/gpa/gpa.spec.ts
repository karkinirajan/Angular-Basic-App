import { TestBed } from '@angular/core/testing';
import { formatGpa, STUDENTS } from '../students/student';
import { Gpa } from './gpa';

describe('Gpa', () => {
  it('shows each student with a one-decimal GPA', async () => {
    await TestBed.configureTestingModule({ imports: [Gpa] }).compileComponents();
    const fixture = TestBed.createComponent(Gpa);
    await fixture.whenStable();
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(STUDENTS.length);
    const lastCell = rows[0].querySelectorAll('td')[3];
    expect(lastCell.textContent?.trim()).toBe(formatGpa(STUDENTS[0]));
  });
});
