import { Component, AfterViewInit } from '@angular/core';
import { Service } from './stydieslisting.service';
import { DataGridService } from '../DataGrid/datagrid.service';
import { RandomID } from '../common/index';

@Component({
	selector: 'stydies-listing',
	providers: [
		Service,
		RandomID
	],
	templateUrl: '../StydiesListing/stydieslisting.component.html'
})

export class StydiesListingComponent implements AfterViewInit {
	private title: string = 'Studies';
	private dataGrid: any;
	private statusButtons: any = [];
	private statuses: any = ["Submitted", "Approved", "Closed"];
	private customStatus: string = 'Other';

	private getStatusClass: any = (value) => {
		if (this.statuses.indexOf(value) > -1) {
			return value;
		} else {
			return this.customStatus;
		}
	};

	private dataGridOptions: any = {
		componentId: this.randomID.getId(),
		filters: true,
		headerFilters: true,
		columns: [
			{
				dataField: 'StudyIRBID',
				caption: 'Study IRB ID'
			},
			{
				dataField: 'SponsorID',
				cellTemplate: 'link'
			},
			{
				dataField: 'StudyName',
				cellTemplate: 'link'
			},
			{
				dataField: 'NumberOfSites',
				dataType: 'number',
				caption: 'Number of Sites',
				cellTemplate: 'link',
				allowFiltering: false
			},
			{
				dataField: 'Status',
				cellTemplate: (container, options) => {
					return container.append(`
						<span class="status-${this.getStatusClass(options.value).toLowerCase()}">
							${options.value}
						</span>
					`);
				}
			},
			{
				dataField: 'DateOfInitialApproval',
				dataType: 'date',
				caption: 'Date of Initial Approval'
			},
			{
				dataField: 'DateOfLastReview',
				dataType: 'date',
				caption: 'Date of Last Review'
			},
			{
				dataField: 'AvailableSubmissions',
				dataType: 'number',
				cellTemplate: 'link',
				caption: 'Available submissions',
				allowFiltering: false
			}
		]
	};
	ngAfterViewInit() {
		this.dataGrid = this.dataGridService.getInstance(this.dataGridOptions.componentId);
	}

	resetClickHandler = () => {
		this.dataGrid.instance.clearFilter();
	}

	buttonClickHandler = (button) => {
		if (button.label === this.customStatus) {
			this.dataGrid.instance.filter((data) => this.statuses.indexOf(data.Status) < 0);
		} else {
			this.dataGrid.instance.filter(["Status", "=", button.label]);
		}
	}

	constructor(
			private service: Service,
			private dataGridService: DataGridService,
			private randomID: RandomID
		) {
		this.dataGridOptions.dataSource = service.getItems();
		this.dataGridOptions.dataSource.on('changed', () => {
			if (!this.statusButtons.length) {
				this.statusButtons = this.service.getButtons(this.statuses);
			}
		});
	}
}
