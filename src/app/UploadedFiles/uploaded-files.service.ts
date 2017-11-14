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
	private itemsURL: string = 'https://59f734d6d85fbd0012ee2235.mockapi.io/files';

	getItems: any = () => {
		return new DataSource({
			load: (loadOptions: any) => {
				return this.http.get(this.itemsURL)
					.toPromise()
					.then(response => response.json());
			},
			update: (item, values) => {
				return this.http.put(`${this.itemsURL}/${encodeURIComponent(item.FileId)}`, Object.assign(item, values))
					.toPromise();
			}
		});
	};

	getButtons: any = () => [
		'UPLOAD MORE FILES',
		'DOWNLOAD',
		'DELETE'
	];

	constructor(private http: Http) {}
}
