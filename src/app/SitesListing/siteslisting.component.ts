import { Component } from '@angular/core';
import { Service } from './siteslisting.service';

@Component({
	selector: 'sites-listing',
	providers: [ Service ],
	templateUrl: '../SitesListing/siteslisting.component.html'
})

export class SitesListingComponent {
	private title: string = 'Sites';

	private dataGridOptions: any = {
		filters: true,
		columns: [
			{
				dataField:'SideID'
			},
			{
				dataField:'SiteName',
				cellTemplate: 'link'
			},
			{
				dataField:'StudyName',
				cellTemplate: 'link'
			},
			{
				dataField:'contacts',
				dataType: 'number',
				allowFiltering: false,
				caption: 'Number of Contacts',
				cellTemplate: 'link'
			}
		]
	};

	constructor(private service: Service) {
		this.dataGridOptions.dataSource = service.getItems();
	}
}
