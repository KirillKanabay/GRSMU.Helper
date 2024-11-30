import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppRoutesService } from '../../../../services/app.route.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  navItems: MenuItem[] | undefined;
  selectedItem?: MenuItem;

  constructor(private readonly appRoutesService: AppRoutesService){}

  ngOnInit(): void {
    this.navItems = [
      { title: 'Главная', icon: 'pi pi-home', route: this.appRoutesService.homeUrl },
      { title: 'Расписание', icon: 'pi pi-calendar-clock', route: this.appRoutesService.scheduleUrl },
      { title: 'Журнал', icon: 'pi pi-book', route: this.appRoutesService.gradesUrl },
      { title: 'Профиль', icon: 'pi pi-user', route: this.appRoutesService.profileUrl },
    ]
    
  }
}
