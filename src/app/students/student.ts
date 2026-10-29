import rawStudents from './students.json';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  major: string;
  creditHrs: number;
  gpaPoints: number;
}

interface RawStudent {
  id: string;
  first_name: string;
  last_name: string;
  major: string;
  credit_hrs: string;
  gpa_points: string;
}

/** Convert the JSON rows (all strings) into typed students. */
export function parseStudents(rows: readonly RawStudent[]): Student[] {
  return rows.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    major: row.major,
    creditHrs: Number(row.credit_hrs),
    gpaPoints: Number(row.gpa_points),
  }));
}

/** Grade point average = gpa points / credit hours; null when there are no credit hours. */
export function gpa(student: Pick<Student, 'creditHrs' | 'gpaPoints'>): number | null {
  return student.creditHrs > 0 ? student.gpaPoints / student.creditHrs : null;
}

/** GPA to one decimal place, or an en dash when it cannot be computed. */
export function formatGpa(student: Pick<Student, 'creditHrs' | 'gpaPoints'>): string {
  const value = gpa(student);
  return value === null ? '–' : value.toFixed(1);
}

/** Case-insensitive match of the query against id, first/last name and major. */
export function filterStudents(students: readonly Student[], query: string): Student[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [...students];
  }
  return students.filter((s) =>
    [s.id, s.firstName, s.lastName, s.major, `${s.firstName} ${s.lastName}`].some((field) =>
      field.toLowerCase().includes(needle),
    ),
  );
}

export const STUDENTS: Student[] = parseStudents(rawStudents as RawStudent[]);
