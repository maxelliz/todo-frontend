import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HistoriqueService } from './historique.service';
import { History } from '../history';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  providers: [ HistoriqueService ],
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  historys: History[] = [];
  page: number = 1;
  direction: string = 'asc';
  column: string = 'id';
  type: string = 'number';

  constructor(private historiqueService: HistoriqueService) { }

  ngOnInit(): void {
    this.getHistory();
  }

  setSortParams(param: any) {
    this.direction = param.dir;
    this.column = param.col;
    this.type = param.typ;
  }

  getHistory(): void {
    this.historiqueService.getHistory()
      .subscribe(historys => (this.historys = historys));
  }

}
