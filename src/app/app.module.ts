import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataGridComponent } from './DataGrid/datagrid.component';
import { DataGridService } from './DataGrid/datagrid.service';
import { TreeListComponent } from './TreeList/treelist.component';
import { StydiesListingComponent } from './StydiesListing/stydieslisting.component';
import { SitesListingComponent } from './SitesListing/siteslisting.component';
import { SubmissionListingComponent } from './SubmissionListing/submissionlisting.component';
import { SubmissionDetailsComponent } from './SubmissionDetails/submission-details.component';
import { UploadedFilesComponent } from './UploadedFiles/uploaded-files.component';
import { UploadedFilesCustomComponent } from './UploadedFilesCustom/uploaded-files-custom.component';

import { DevExtremeModule,
	DxDataGridComponent,
	DxDataGridModule,
	DxSelectBoxModule,
	DxCheckBoxModule,
	DxTreeListModule,
	DxButtonModule } from 'devextreme-angular';

@NgModule({
	providers: [
		DataGridService
	],
	imports: [
		BrowserModule,
		HttpModule,
		DxDataGridModule,
		DxSelectBoxModule,
		DxCheckBoxModule,
		DxTreeListModule,
		DxButtonModule
	],
	declarations: [
		AppComponent,
		DataGridComponent,
		TreeListComponent,
		StydiesListingComponent,
		SitesListingComponent,
		SubmissionListingComponent,
		SubmissionDetailsComponent,
		UploadedFilesComponent,
		UploadedFilesCustomComponent
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
