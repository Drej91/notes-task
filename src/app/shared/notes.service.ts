import { Injectable } from '@angular/core';
import { Note } from './note.model';

interface StoredNotes {
  notes: Note[];
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  private data: StoredNotes = {
    notes: [],
  };

  constructor() {}

  addNote(note: Note): number {
    const newLength = this.notes.push(note);
    return newLength - 1;
  }

  updateNote(id: number, title: string, body: string): void {
    const note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  storeNotes(note: Note): void {
    const alreadyInStorage = this.getStoredNotes();
    if (alreadyInStorage) {
      alreadyInStorage.push(note);
      localStorage.setItem('notes', JSON.stringify(alreadyInStorage));
    } else {
      this.data.notes.push(note);
      localStorage.setItem('notes', JSON.stringify(this.data.notes));
    }
  }

  getStoredNotes(): any {
    return JSON.parse(localStorage.getItem('notes'));
  }
}
