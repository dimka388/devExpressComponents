import { Component } from '@angular/core';
import { Service } from './uploaded-files-custom.service';

@Component({
	selector: 'uploaded-files-custom',
	providers: [ Service ],
	templateUrl: '../UploadedFilesCustom/uploaded-files-custom.component.html'
})

export class UploadedFilesCustomComponent {
	private buttons: any;

	private cellNameTemplate: any = (container, options) => {
		let state = !options.value.length || options.value === options.data['FileName'];
		if (state) {
			container.append(`<em class="placeholder">${this.dataGridOptions.placeholderText}</em>`);
		} else {
			container.append(options.value);
		}
	};

	private dataGridOptions: any = {
		placeholderText: 'Same as File Name',
		allowUpdating: false,
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
		this.buttons = service.getButtons();
		this.dataGridOptions.dataSource = service.getItems();
	}
}
