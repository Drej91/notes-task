import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  noteId: number;
  new: boolean;
  stored: Array<Note>;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      if (params.id) {
        this.stored = this.notesService.getStoredNotes();
        this.note = this.stored[params.id];
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (this.new) {
      this.notesService.storeNotes(form.value);
    } else {
      const updateIndex = this.stored.findIndex(
        (s) => s.title === this.note.title && s.body === this.note.body
      );

      if (updateIndex !== -1) {
        this.stored[updateIndex].title = form.value.title;
        this.stored[updateIndex].body = form.value.body;
        localStorage.setItem('notes', JSON.stringify(this.stored));
      }
    }
    this.router.navigateByUrl('/');
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }
}
