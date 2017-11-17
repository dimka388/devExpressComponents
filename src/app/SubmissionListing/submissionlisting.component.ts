import { Component, AfterViewInit } from '@angular/core';
import { Service } from './submissionlisting.service';
import { DataGridService } from '../DataGrid/datagrid.service';
import { RandomID } from '../common/index';

@Component({
	selector: 'submission-listing',
	providers: [
		Service,
		RandomID
	],
	templateUrl: '../SubmissionListing/submissionlisting.component.html'
})

export class SubmissionListingComponent implements AfterViewInit {
	private title: string = 'Submission';

	private dataGrid: any;

	private statusButtons: any = [];

	private dataGridOptions: any = {
		componentId: this.randomID.getId(),
		filters: true,
		headerFilters: true,
		columns: [
			{
				dataField: 'Submission',
				cellTemplate: 'link'
			},
			{
				dataField: 'Type'
			},
			{
				dataField: 'Status',
				cellTemplate: 'status'
			},
			{
				dataField: 'Study',
				cellTemplate: 'link'
			},
			{
				dataField: 'Site',
				cellTemplate: 'link'
			},
			{
				dataField: 'SubmittedBy'
			},
			{
				dataField: 'SubmittedDate',
				dataType: 'date',
				filterOperations: [],
				caption: 'Date Submitted'
			}
		],
		resetClickHandler: () => {
			this.dataGrid.instance.clearFilter();
		},
		buttonClickHandler: (button) => {
			this.dataGrid.instance.filter(["Status", "=", (button.filter || button.label)]);
		}
	};

	ngAfterViewInit() {
		this.dataGrid = this.dataGridService.getInstance(this.dataGridOptions.componentId);
	}

	constructor(
			private service: Service,
			private dataGridService: DataGridService,
			private randomID: RandomID
		) {
		this.dataGridOptions.dataSource = service.getItems();
		this.dataGridOptions.dataSource.on('changed', () => {
			if (!this.statusButtons.length) {
				this.statusButtons = this.service.getButtons();
			}
		});
	}
}
