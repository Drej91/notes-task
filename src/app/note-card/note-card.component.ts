import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() link: any;

  @Output('delete') readonly deleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDeleteButtonClick(): void {
    this.deleteEvent.emit();
  }
}
