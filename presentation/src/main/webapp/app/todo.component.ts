import { Component } from '@angular/core';

export class Todo {
    id: number;
    text: string;
    owner: string;
}

const TODOS: Todo[] = [
    { id: 1, text: 'Mr. Nice' , owner: 'User1' },
    { id: 2, text: 'Narco'    , owner: 'User1' },
    { id: 3, text: 'Bombasto' , owner: 'User1' },
    { id: 4, text: 'Celeritas', owner: 'User1' },
    { id: 5, text: 'Magneta'  , owner: 'User1' },
    { id: 6, text: 'RubberMan', owner: 'User1' },
    { id: 7, text: 'Dynama'   , owner: 'User1' },
    { id: 8, text: 'Dr IQ'    , owner: 'User1' },
    { id: 9, text: 'Magma'    , owner: 'User1' }
];

@Component({
    selector: 'todo',
    templateUrl : 'templates/todo.html'
})

export class TodoComponent {
    todos = TODOS;
}