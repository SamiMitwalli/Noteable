"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Todo = (function () {
    function Todo() {
    }
    return Todo;
}());
exports.Todo = Todo;
var TODOS = [
    { id: 1, text: 'Mr. Nice', owner: 'User1' },
    { id: 2, text: 'Narco', owner: 'User1' },
    { id: 3, text: 'Bombasto', owner: 'User1' },
    { id: 4, text: 'Celeritas', owner: 'User1' },
    { id: 5, text: 'Magneta', owner: 'User1' },
    { id: 6, text: 'RubberMan', owner: 'User1' },
    { id: 7, text: 'Dynama', owner: 'User1' },
    { id: 8, text: 'Dr IQ', owner: 'User1' },
    { id: 9, text: 'Magma', owner: 'User1' }
];
var TodoComponent = (function () {
    function TodoComponent() {
        this.todos = TODOS;
    }
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: 'templates/todo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map