import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../services/details.service";

@Component({
  selector: 'app-page.details',
  templateUrl: './page.details.component.html',
  styleUrls: ['./page.details.component.css']
})
export class PageDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private detailsService: DetailsService) { }

  title = '';
  summary = '';
  imageURL = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.title;
      this.detailsService.getSummary(this.title).then(summary => this.summary = summary);
      this.detailsService.getPageImageURL(this.title).then(url => this.imageURL = url);
    })
  }



}
