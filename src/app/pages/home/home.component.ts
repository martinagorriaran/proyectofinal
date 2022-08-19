import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // const nav = document.querySelector('nav');

  // function () {
  //   if (window.pageYOffset > 100) {
  //     nav.classList.add('bg-dark', 'shadow');
  //   } else {
  //     nav.classList.remove('bg-dark', 'shadow');
  //   }
  // };

  constructor() {

  }

  ngOnInit(): void {
  }

}
