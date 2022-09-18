import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/core/interfaces/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {

  displayedColumns: string[] = ['']

  noteData: Note;

  @Input()
  set note(input: Note) {
    this.noteData = input;
  }

  constructor() { }

  ngOnInit(): void { }

}
