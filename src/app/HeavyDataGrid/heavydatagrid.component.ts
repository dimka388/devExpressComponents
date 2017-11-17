import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'heavy-data-grid',
	templateUrl: '../HeavyDataGrid/heavydatagrid.component.html'
})

export class HeavyDataGridComponent implements OnInit {
	@Input('options') customOptions: any;
	@Input('buttons') statusButtons: any;
	@Input() title: string;

	private dataGridOptions: any = {
		filters: true,
		headerFilters: true,
		resetClickHandler: () => {},
		buttonClickHandler: () => {}
	};

	ngOnInit() {
		if (this.customOptions) {
			this.dataGridOptions = {...this.dataGridOptions, ...this.customOptions};
		}
	}

	constructor() {}
}
