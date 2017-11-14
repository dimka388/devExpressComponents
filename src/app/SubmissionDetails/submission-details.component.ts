import { Component, ViewChild } from '@angular/core';
import { Service } from './submission-details.service';

@Component({
	selector: 'submission-details',
	providers: [ Service ],
	templateUrl: '../SubmissionDetails/submission-details.component.html'
})

export class SubmissionDetailsComponent {
	private title: string = 'Submission Details';

	private cellNameTemplate: any = (container, options) => {
		let state = !options.value.length || options.value === options.data['FileName'];
		if (state) {
			container.append(`<em class="placeholder">${this.options.placeholderText}</em>`);
		} else {
			container.append(options.value);
		}
	};

	private options: any = {
		placeholderText: 'Same as File Name',
		selectionMode: 'multiple',
		columns: [
			{
				dataField:'DocumentID'
			},
			{
				dataField:'FileName'
			},
			{
				dataField:'PreferredName',
				cellTemplate: this.cellNameTemplate
			},
			{
				dataField:'Status'
			},
			{
				dataField:'SubmittedBy'
			},
			{
				dataField:'SubmittedDate',
				dataType: 'date',
				caption: 'Date Submitted'
			}
		]
	};

	constructor(private service: Service) {
		this.options.dataSource = service.getItems();
	}
}
