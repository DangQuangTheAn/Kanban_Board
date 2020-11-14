import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Board } from './Board';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor() {
    this.boards = this.getBoards();
    if (!this.boards || this.boards.length == 0) {
      this.boards = [this.board1, this.board2, this.board3];
    }
    this.updateBoards();
    for (const board of this.boards) {
      this.listTask = this.listTask.concat(board.items);
    }
  }

  ngOnInit(): void {}

  newBoard: string;

  input: string = '';

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // doing = [
  //   'Get up 1111',
  //   'Brush teeth 1111',
  //   'Take a shower 1111',
  //   'Check e-mail 1111',
  //   'Walk dog 1111',
  // ];

  boards: Board[] = [];
  listTask: string[] = [];

  board1: Board = {
    title: 'Todo',
    items: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
    typing: '',
  };
  board2: Board = {
    title: 'Doing',
    items: ['Get up', 'Brush teeth'],
    typing: '',
  };
  board3: Board = {
    title: 'Done',
    items: ['Take a shower', 'Check e-mail', 'Walk dog'],
    typing: '',
  };

  color = "accent";
  color1 = "primary";

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateBoards();
  }

  addItemInBoard(board: Board) {
    if (board.typing.trim() !== '') {
      if (this.listTask.indexOf(board.typing) >= 0) {
        alert('Item is exists');
        return;
      }
      board.items.push(board.typing);
      this.listTask.push(board.typing);
      board.typing = '';
      this.updateBoards();
    } else{
      alert("Không được nhập khoảng trắng");
      board.typing = '';
    }
  }

  deleteItemInBoard(input: string, board: Board) {
    if (confirm('Delete?')) {
      const index = board.items.indexOf(input);
      board.items.splice(index, 1);
      this.updateBoards();
    }
  }

  updateBoards() {
    localStorage.setItem('board', JSON.stringify(this.boards));
  }

  getBoards(): Board[] {
    return JSON.parse(localStorage.getItem('board'));
  }

  addBoard() {
    if (this.newBoard) {
      const board = new Board();
      board.title = this.newBoard;
      board.items = [];
      board.typing = '';
      this.boards.push(board);
      this.updateBoards();
    }
    this.newBoard = '';
  }

  deleteBoard(board: Board) {
    if (confirm('Delete?')) {
      const index = this.boards.indexOf(board);
      if (index >= 0) {
        this.boards.splice(index, 1);
        this.updateBoards();
      }
    }
  }
}
