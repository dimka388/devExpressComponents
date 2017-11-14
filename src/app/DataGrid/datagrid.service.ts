import { Injectable } from '@angular/core';

@Injectable()

export class DataGridService {
	public instances : any = {};

	public setInstance: any = (id, instance) => {
		if (id !== null) {
			this.instances[id] = instance;
		}
	};

	public getInstance: any = (id) => {
		return this.instances[id] || null;
	};

	constructor() {}
}