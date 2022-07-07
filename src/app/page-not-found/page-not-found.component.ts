import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  timer: number = 10;
  stream$: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.stream$ = interval(1000)
    .pipe(take(10), map(v => (10 - v)))
    .subscribe({
      next: value => {
        this.timer = value-1;
        console.log('Next: ', this.timer);
        if (this.timer === 0)
          this.router.navigate(['/']);
      },
      error: e => console.log('Something wrong: ', e),
      complete: () => console.log('Complete')
    })
  }
}
