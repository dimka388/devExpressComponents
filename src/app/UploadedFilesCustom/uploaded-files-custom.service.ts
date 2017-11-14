import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';

export class File {
	FileName: string;
	PreferredName: string;
	FileId: number;
}

@Injectable()

export class Service {
	private itemsURL: string = 'http://59f734d6d85fbd0012ee2235.mockapi.io/files-custom';

	getItems: any = () => {
		return new DataSource({
			load: (loadOptions: any) => {
				return this.http.get(this.itemsURL)
					.toPromise()
					.then(response => response.json());
			}
		});
	}

	getButtons: any = () => [
		'UPLOAD MORE FILES',
		'EDIT',
		'DOWNLOAD',
		'DELETE'
	];

	constructor(private http: Http) {}
}
