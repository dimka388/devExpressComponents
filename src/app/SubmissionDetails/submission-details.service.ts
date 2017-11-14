import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';

export class Item {
	DocumentID: number;
	FileName: string;
	PreferredName: string;
	Status: string;
	SubmittedBy: string;
	SubmittedDate: string;
	InnerItems?: Item[];
}

@Injectable()

export class Service {
	private itemsURL: string = 'https://59f734d6d85fbd0012ee2235.mockapi.io/submissions-details';

	getItems: any;

	constructor(private http: Http) {
		this.getItems = () => {
			return new DataSource({
				load: (loadOptions: any) => {
					return http.get(this.itemsURL)
						.toPromise()
						.then(response => response.json());
				}
			});
		}
	}
}
