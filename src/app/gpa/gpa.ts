import { Component, computed, signal } from '@angular/core';
import { filterStudents, formatGpa, STUDENTS } from '../students/student';

@Component({
  selector: 'app-gpa',
  templateUrl: './gpa.html',
})
export class Gpa {
  protected readonly query = signal('');
  protected readonly students = computed(() => filterStudents(STUDENTS, this.query()));
  protected readonly formatGpa = formatGpa;

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
