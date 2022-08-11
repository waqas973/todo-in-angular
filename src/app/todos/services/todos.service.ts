import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    const updatedTodo = [...this.todos$.getValue(), newTodo];

    this.todos$.next(updatedTodo);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });

    this.todos$.next(updatedTodo);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodo);
  }

  removeTodo(id: string): void {
    const updatedTodo = this.todos$.getValue().filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodo);
  }

  toggleTodo(id: string): void {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodo);
  }
}
