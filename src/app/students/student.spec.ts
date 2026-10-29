import { filterStudents, formatGpa, gpa, parseStudents, Student, STUDENTS } from './student';

const alice: Student = {
  id: '1',
  firstName: 'Alice',
  lastName: 'Zed',
  major: 'CIT',
  creditHrs: 20,
  gpaPoints: 50,
};
const bob: Student = {
  id: '22',
  firstName: 'Bob',
  lastName: 'Young',
  major: 'BUS',
  creditHrs: 0,
  gpaPoints: 0,
};

describe('student helpers', () => {
  it('parses numeric strings from the JSON rows', () => {
    const [s] = parseStudents([
      {
        id: '7',
        first_name: 'A',
        last_name: 'B',
        major: 'WEB',
        credit_hrs: '23',
        gpa_points: '48',
      },
    ]);
    expect(s).toEqual({
      id: '7',
      firstName: 'A',
      lastName: 'B',
      major: 'WEB',
      creditHrs: 23,
      gpaPoints: 48,
    });
  });

  it('computes gpa as points over credit hours', () => {
    expect(gpa(alice)).toBe(2.5);
  });

  it('returns null gpa and a dash when there are no credit hours', () => {
    expect(gpa(bob)).toBeNull();
    expect(formatGpa(bob)).toBe('–');
  });

  it('formats gpa to one decimal place like the original table', () => {
    expect(formatGpa({ creditHrs: 23, gpaPoints: 48 })).toBe('2.1');
    expect(formatGpa(alice)).toBe('2.5');
  });

  it('returns everyone for an empty or blank query', () => {
    expect(filterStudents([alice, bob], '')).toHaveLength(2);
    expect(filterStudents([alice, bob], '   ')).toHaveLength(2);
  });

  it('filters case-insensitively across id, names and major', () => {
    expect(filterStudents([alice, bob], 'ALICE')).toEqual([alice]);
    expect(filterStudents([alice, bob], 'young')).toEqual([bob]);
    expect(filterStudents([alice, bob], 'bus')).toEqual([bob]);
    expect(filterStudents([alice, bob], '22')).toEqual([bob]);
    expect(filterStudents([alice, bob], 'alice zed')).toEqual([alice]);
    expect(filterStudents([alice, bob], 'nobody')).toEqual([]);
  });

  it('does not mutate the input list', () => {
    const list = [alice, bob];
    filterStudents(list, 'alice');
    expect(list).toEqual([alice, bob]);
  });

  it('loads the bundled data set with numeric fields and unique ids', () => {
    expect(STUDENTS.length).toBeGreaterThan(0);
    expect(
      STUDENTS.every((s) => Number.isFinite(s.creditHrs) && Number.isFinite(s.gpaPoints)),
    ).toBe(true);
    expect(new Set(STUDENTS.map((s) => s.id)).size).toBe(STUDENTS.length);
  });
});
