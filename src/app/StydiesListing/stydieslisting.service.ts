import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

export class Item {
	Submission: string;
	Type: string;
	Status: string;
	Study: string;
	Site: string;
	SubmittedBy: string;
	SubmittedDate: string;
}

@Injectable()

export class Service {
	private itemsURL: string = 'http://59f734d6d85fbd0012ee2235.mockapi.io/stydies-listing';
	private items : Item[];
	private buttons = [
		{
			"label": "Submitted",
			"value": 0
		},
		{
			"label": "Approved",
			"value": 0
		},
		{
			"label": "Other",
			"value": 0
		},
		{
			"label": "Closed",
			"value": 0
		}
	];
	private customButton: string = 'Other';

	public getItems: any = () => {
		return new DataSource({
			load: (loadOptions: any) => {
				return this.http.get(this.itemsURL)
					.toPromise()
					.then(response => {
						this.items = response.json();
						return this.items;
					});
			}
		});
	};
	public getButtons: any = (statuses) => {
		let customButton = this.buttons.filter((button) => button.label.indexOf(this.customButton) > -1);
		this.items.map((item: Item) => {
			let label = item.Status;
			let button = this.buttons.filter((button) => button.label.indexOf(label) > -1);
			if (button.length) {
				button[0].value++;
			} else {
				if (customButton.length) {
					customButton[0].value++;
				}
			}
		});
		return this.buttons;
	};

	constructor(private http: Http) {}
}
