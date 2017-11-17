import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'light-data-grid',
	templateUrl: '../LightDataGrid/lightdatagrid.component.html'
})

export class LightDataGridComponent implements OnInit {
	@Input() customOptions: any;

	private dataGridOptions: any = {};

	ngOnInit() {
		if (this.customOptions) {
			this.dataGridOptions = {...this.dataGridOptions, ...this.customOptions};
		}
	}

	constructor() {}
}
