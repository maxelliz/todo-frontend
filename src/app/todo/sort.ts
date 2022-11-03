import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo';

@Pipe({name:'sort'})

export class SortPipe implements PipeTransform{

	transform(items: Todo[], direction: string, column: string, type: string) {
		let sortedItems = [];
		sortedItems = direction === 'asc' ? this.sortAscending(items, column, type) : this.sortDescending(items, column, type);
		return sortedItems;
	}

	sortAscending(items: Todo[], column: string, type: string) {
		return [...items.sort(function(a: any, b: any): number {
			if(type === 'string') {
				if (a[column].toUpperCase() < b[column].toUpperCase()) {
					return -1;
				} else {
					return 0;
				}
			} else {
				return a[column] - b[column];
			}
		})]
	}

	sortDescending(items: Todo[], column: string, type: string) {
		return [...items.sort(function(a: any, b: any): number {
			if(type === 'string') {
				if (a[column].toUpperCase() > b[column].toUpperCase()) {
					return -1;
				} else {
					return 0;
				}
			} else {
				return b[column] - a[column];
			}
		})]
	}
}