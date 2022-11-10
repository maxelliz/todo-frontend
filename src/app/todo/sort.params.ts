import { Directive,Output,EventEmitter,ElementRef,HostListener } from '@angular/core';

@Directive({selector: '[appSortParams]'})

export class SortTodoParamsDirective {

@Output() param:EventEmitter<any> = new EventEmitter();

constructor(private element: ElementRef) { }

@HostListener('click') onClickIcon(){
	this.selectSort(this.element.nativeElement.id);
}

selectSort(id: string) {
	switch(id) {
		case 'idAsc':
			this.param.emit({dir:'asc', col:'id', typ:'number'})
			break;
		case 'idDesc':
			this.param.emit({dir:'desc', col:'id', typ:'number'})
			break;
		case 'todoDescriptionAsc':
			this.param.emit({dir:'asc', col:'description', typ:'string'})
			break;
		case 'todoDescriptionDesc':
			this.param.emit({dir:'desc', col:'description', typ:'string'})
			break;
		case 'todoDateAsc' :
			this.param.emit({dir:'asc', col:'targetDate', typ:'Date'})
			break;
		case 'todoDateDesc' :
			this.param.emit({dir:'desc', col:'targetDate', typ:'Date'})
			break;
		}
	}
}