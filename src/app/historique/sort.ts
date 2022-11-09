import { Pipe, PipeTransform } from '@angular/core';
import { History } from '../history';

@Pipe({name:'sortHistory'})

export class SortHistoryPipe implements PipeTransform{

	transform(items: History[], direction: string, column: string, type: string) {
		let sortedItems = [];
		sortedItems = direction === 'asc' ? this.sortAscending(items, column, type) : this.sortDescending(items, column, type);
		return sortedItems;
	}

	sortAscending(items: History[], column: string, type: string) {
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

	sortDescending(items: History[], column: string, type: string) {
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