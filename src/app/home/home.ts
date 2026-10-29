import { Component, computed, signal } from '@angular/core';
import { filterStudents, STUDENTS } from '../students/student';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  protected readonly query = signal('');
  protected readonly students = computed(() => filterStudents(STUDENTS, this.query()));

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
