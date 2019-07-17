import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService) {
  }

  searchQuery = '';
  results = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.searchQuery = params.query;
      this.searchService.doSearch(this.searchQuery).then(res => {
        res.next().then(data => this.results = data.results);
      })
    })
  }

}
