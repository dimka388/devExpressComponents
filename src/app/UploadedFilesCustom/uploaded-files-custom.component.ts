import { Component } from '@angular/core';
import { Service } from './uploaded-files-custom.service';

@Component({
	selector: 'uploaded-files-custom',
	providers: [ Service ],
	templateUrl: '../UploadedFilesCustom/uploaded-files-custom.component.html'
})

export class UploadedFilesCustomComponent {
	private title: string = 'Uploaded files (New Submission)';

	private buttons: string[] = [
		'UPLOAD MORE FILES',
		'EDIT',
		'DOWNLOAD',
		'DELETE'
	];

	private cellNameTemplate: any = (container, options) => {
		let state = !options.value.length || options.value === options.data['FileName'];
		let value = state ? `<em class="placeholder">${this.dataGridOptions.placeholderText}</em>` : options.value;
		container.append(value);
	};

	private dataGridOptions: any = {
		placeholderText: 'Same as File Name',
		selectionMode: 'multiple',
		columns: [
			{
				dataField:'FileName',
				allowEditing: false
			},
			{
				dataField:'SponsorPreferredName',
				cellTemplate: this.cellNameTemplate
			},
			{
				dataField:'SitePreferredName',
				cellTemplate: this.cellNameTemplate
			}
		]
	};

	constructor(private service: Service) {
		this.dataGridOptions.dataSource = service.getItems();
	}
}
