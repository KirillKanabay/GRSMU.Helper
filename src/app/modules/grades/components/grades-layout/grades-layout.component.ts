import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, delay, interval, Subscription, timeout } from 'rxjs';
import { GradebookApiService } from '../../../../api/gradebook/gradebook-api.service';
import { LookupModel } from '../../../../api/types/lookup.model';

@Component({
  selector: 'app-grades-layout',
  templateUrl: './grades-layout.component.html',
  styleUrl: './grades-layout.component.scss'
})
export class GradesLayoutComponent implements OnInit {
  
  constructor(
    private readonly _gradebookApiService: GradebookApiService,
    private readonly _destroyRef: DestroyRef
  ){}
  
  public searchForm = new FormGroup({
    searchQuery: new FormControl<string>('')
  })

  public activeIndex?: number;
  public disciplines = signal<LookupModel[]>([]);
  public isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.searchDisciplines(null);

    const searchSubscription = this.searchForm.controls.searchQuery.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe(val => this.searchDisciplines(val))

    this._destroyRef.onDestroy(() => searchSubscription.unsubscribe());
  }

  private lookupSubscription?: Subscription;
  private searchDisciplines(val: string | null){
    val ??= '';

    this.lookupSubscription?.unsubscribe();    
    this.isLoading.set(true);

    this.lookupSubscription = this._gradebookApiService.getDisciplineLookup(val).subscribe(
      (val) => {
        this.lookupSubscription?.unsubscribe();
        this.disciplines.set(val);
        this.isLoading.set(false);
      }
    );
  }
}
