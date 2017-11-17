import { Component } from '@angular/core';
import { Service } from './uploaded-files.service';

@Component({
	selector: 'uploaded-files',
	providers: [ Service ],
	templateUrl: '../UploadedFiles/uploaded-files.component.html'
})

export class UploadedFilesComponent {
	private title: string = 'Uploaded files';

	private buttons: string[] = [
		'UPLOAD MORE FILES',
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
		allowUpdating: true,
		columns: [
			{
				dataField:'FileName',
				allowEditing: false
			},
			{
				dataField:'PreferredName',
				cellTemplate: this.cellNameTemplate
			}
		]
	};

	constructor(private service: Service) {
		this.dataGridOptions.dataSource = service.getItems();
	}
}
