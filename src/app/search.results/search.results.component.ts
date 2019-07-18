import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search.results.component.html',
  styleUrls: ['./search.results.component.css']
})
export class SearchResultsComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) {
  }

  searchQuery = '';
  results = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.searchQuery = params.query;
      this.searchService.doSearch(this.searchQuery).then(res => this.results = res.results);
      })
  }

}
