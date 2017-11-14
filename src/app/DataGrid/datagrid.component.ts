import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DataGridService } from '../DataGrid/datagrid.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
	selector: 'data-grid',
	providers: [ DatePipe ],
	templateUrl: '../DataGrid/datagrid.component.html',
	styleUrls: ['../DataGrid/datagrid.component.scss']
})

export class DataGridComponent implements OnInit {
	@ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
	@Input() customOptions: any;

	private cellTemplates: any = {
		link: (container, options) => {
			return container.append(`
				<a href="${options.value}">
					${options.value}
				</a>
			`);
		},
		status: (container, options) => {
			return container.append(`
				<span class="status-${options.value.toLowerCase()}">
					${options.value}
				</span>
			`);
		}
	};

	private defaultOptions: any = {
		componentId: null,
		filters: false,
		headerFilters: false,
		selectionMode: 'none',
		selectionCheckboxes: 'always',
		editingMode: 'row',
		allowUpdating: false,
		allowDeleting: false,
		allowAdding: false,
		paging: 10,
		columns: [],
		format: {
			formatter: (date) => {
				if (typeof date.getDate === 'function') {
					return this.datePipe.transform(date, 'dd-MMM-yyyy');
				}
			}
		},
		onCellPrepared: (e) => {
			if (e.rowType === 'data' && e.column.command === 'edit') {
				let isEditing = e.row.isEditing,
					$links = e.cellElement.find('.dx-link');

				$links.text('');

				if (isEditing) {
					$links.filter('.dx-link-save').addClass('dx-icon-save');
					$links.filter('.dx-link-cancel').addClass('dx-icon-revert');
				} else {
					$links.filter('.dx-link-edit').addClass('dx-icon-edit');
					$links.filter('.dx-link-delete').addClass('dx-icon-trash');
				}
			}
		},
		getTemplate: (template) => this.cellTemplates[template] || template
	};

	public options : any = {};

	ngOnInit() {
		this.options = Object.assign(this.defaultOptions, this.customOptions);
		this.dataGridService.setInstance(this.options.componentId, this.dataGrid);
	}

	constructor(private datePipe: DatePipe, private dataGridService: DataGridService) {}
}