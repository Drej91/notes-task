import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  displayNoData: boolean;
  stored: Array<Note>;
  filteredData: Array<Note>;
  searchText: string;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.stored = this.notesService.getStoredNotes();
    if (this.stored) {
      this.stored.forEach((n) => {
        this.notes.push(n);
      });
      this.displayNoData = !this.notes.length;
    }
  }
  deleteSelectedNote(note: Note): void {
    const findNoteIndex = this.notes.findIndex(
      (n) => n.title === note.title && n.body === note.body
    );
    if (findNoteIndex !== -1) {
      this.notes.splice(findNoteIndex, 1);
      localStorage.setItem('notes', JSON.stringify(this.notes));
      if (!this.notes.length) {
        this.displayNoData = true;
      }
    }
  }

  searchNote(searchText: any): any {
    searchText = searchText.toLocaleLowerCase();
    return (this.notes = this.stored.filter((x) => {
      return x.title.toLowerCase().includes(searchText);
    }));
  }
}
