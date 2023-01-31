import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactProvider } from 'src/providers/contact.provider';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/services/confirm-dialog.service';
import { UserService } from 'src/services/user.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @ViewChild('contactTable') contactTable!: MatTable<any>;
    dataContact: [] = [];
    method!: string;
    displayedColumns: string[] = ['nome', 'telefone', 'email', 'icon'];
    contact: any;
    token!: string;

    constructor(
        public dialog: MatDialog,
        private contactProvider: ContactProvider,
        private dialogService: ConfirmDialogService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.token = localStorage.getItem('token')!;
        console.log("🚀 ~ file: home.component.ts:34 ~ HomeComponent ~ ngOnInit ~ this.token", this.token)
        if (!this.token) {
            location.replace('http://localhost:4200/login');
          }
        this.getContactList();
    }

    async getContactList() {
        this.dataContact = await this.contactProvider.listContactsByUserId();
    }

    getContacts(contactSelected: any) {
        this.method = 'edit';
        sessionStorage.setItem('method', this.method);
        const dialogRef = this.dialog.open(HomeDialogComponent, {
            width: '500px',
            height: '400px',
            data: contactSelected,
        });
        dialogRef.afterClosed().subscribe(contact => {
            if (contact) {
                this.getContactList();
            }
        });
    }

    openDialog() {
        this.method = 'add';
        sessionStorage.setItem('method', this.method);
        const dialogRef = this.dialog.open(HomeDialogComponent, {
            width: '500px',
            height: '400px',
        });

        dialogRef.afterClosed().subscribe(dependent => {
            if (dependent) {
                this.getContactList();
            }
        });
    }

    deleteContact(id: string) {
        const options = {
            data: {
                title: 'Atenção',
                subtitle: 'Você tem certeza que deseja excluir esse contato?',
            },
            panelClass: 'confirm-modal', 
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(async confirmed => {
            if (confirmed) {
                try {
                    await this.contactProvider.deleteContact(id);
                    this.getContactList();
                } catch (error) {
                    console.log('ERROR 132' + error);
                }
            }
        });
    }

    logout(){
    this.userService.logout();
    }
}