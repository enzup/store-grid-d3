import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-repo-grid',
  templateUrl: './repo-grid.component.html',
  styleUrls: ['./repo-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RepoGridComponent {
  @Input() rowData: any[] = [];

  columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Repo ',
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      field: 'stars',
      headerName: 'Stars',
      sortable: true,
      filter: true,
      flex: 1,
      type: 'centerAligned',
      cellStyle: { textAlign: 'center' },
      cellClass: 'grid-cell-centered',
    },
  ];
}
