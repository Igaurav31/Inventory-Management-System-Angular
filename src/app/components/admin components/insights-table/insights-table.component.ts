import { Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-insights-table',
  templateUrl: './insights-table.component.html',
  styleUrls: ['./insights-table.component.css'],
})
export class InsightsTableComponent {
  @Input() rowData!: any[];
  @Input() columnDefs!: any[];
}
