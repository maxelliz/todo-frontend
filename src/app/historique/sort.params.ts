import { Directive,Output,EventEmitter,ElementRef,HostListener } from '@angular/core';

@Directive({selector: '[appSortParams]'})

export class SortHistoryParamsDirective {

@Output() param:EventEmitter<any> = new EventEmitter();

constructor(private element: ElementRef) { }

@HostListener('click') onClickIcon(){
	this.selectSort(this.element.nativeElement.id);
}

selectSort(id: string) {
	switch(id) {
		case 'idTodoAsc':
			this.param.emit({dir:'asc', col:'idTodo', typ:'number'})
			break;
		case 'idTodoDesc':
			this.param.emit({dir:'desc', col:'idTodo', typ:'number'})
			break;
		case 'descriptionAsc':
			this.param.emit({dir:'asc', col:'todoDescription', typ:'string'})
			break;
		case 'descriptionDesc':
			this.param.emit({dir:'desc', col:'todoDescription', typ:'string'})
			break;
		case 'statutAsc':
			this.param.emit({dir:'asc', col:'status', typ:'string'})
			break;
		case 'statutDesc':
			this.param.emit({dir:'desc', col:'status', typ:'string'})
			break;
		case 'dateAsc':
			this.param.emit({dir:'asc', col:'date', typ:'date'})
			break;
		case 'dateDesc':
			this.param.emit({dir:'desc', col:'date', typ:'date'})
			break;
		}
	}
}