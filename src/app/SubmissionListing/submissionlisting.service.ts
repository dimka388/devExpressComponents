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

export class Button {
	label: string;
	filter?: string;
	value: number;
}

@Injectable()

export class Service {
	private itemsURL: string = 'https://59f734d6d85fbd0012ee2235.mockapi.io/submission';

	private items : Item[];

	private buttons : Button[] = [
		{
			"label": "Drafts",
			"filter": "Draft",
			"value": 0
		},
		{
			"label": "Received",
			"value": 0
		},
		{
			"label": "Pre-Processing",
			"value": 0
		},
		{
			"label": "Review",
			"value": 0
		},
		{
			"label": "Post-Processing",
			"value": 0
		},
		{
			"label": "Complete",
			"value": 0
		}
	];

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

	public getButtons: any = () => {
		this.items.map((item: Item) => {
			let label = item.Status;
			let button = this.buttons.filter((button) => button.label.indexOf(label) > -1);
			if (button.length) button[0].value++;
		});
		return this.buttons;
	};

	constructor(private http: Http) {}
}
