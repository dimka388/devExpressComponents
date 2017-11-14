import { Component, Input, OnInit } from '@angular/core';
import { Service } from './uploaded-files.service';

@Component({
	selector: 'uploaded-files',
	providers: [ Service ],
	templateUrl: '../UploadedFiles/uploaded-files.component.html'
})

export class UploadedFilesComponent implements OnInit {
	@Input() customOptions: any;
	@Input() customButtons: any;

	private title: string = 'Uploaded files';

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
		selectionMode: 'multiple',
		placeholderText: 'Same as File Name',
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

	ngOnInit() {
		if (this.customOptions) {
			this.dataGridOptions = {...this.dataGridOptions, ...this.customOptions};
		}
		if (this.customButtons) {
			this.buttons = this.customButtons;
		}
	}

	constructor(private service: Service) {
		this.dataGridOptions.dataSource = service.getItems();
		this.buttons = service.getButtons();
	}
}
