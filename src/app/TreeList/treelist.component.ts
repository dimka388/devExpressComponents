import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'tree-list',
	providers: [DatePipe],
	templateUrl: '../TreeList/treelist.component.html',
	styleUrls: ['../TreeList/treelist.component.scss']
})

export class TreeListComponent implements OnInit {
	@Input() customOptions: any;

	private options: any;

	private defaultOptions: any = {
		format: {
			formatter: (date) => {
				if (typeof date.getDate === 'function') {
					return this.datePipe.transform(date, 'dd-MMM-yyyy');
				}
			}
		},
		itemsExpr: 'InnerItems',
		dataStructure: 'tree',
		filters: false,
		headerFilters: false,
		selectionMode: 'none',
		selectionCheckboxes: 'always',
		editingMode: 'row',
		allowUpdating: false,
		allowDeleting: false,
		allowAdding: false,
		columns: []
	}

	ngOnInit() {
		this.options = {...this.defaultOptions, ...this.customOptions};
	}

	constructor(private datePipe: DatePipe) {}
}