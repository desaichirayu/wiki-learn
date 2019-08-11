import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TagserviceService} from '../services/tagservice.service';

@Component({
  selector: 'app-tagresults',
  templateUrl: './tagresults.component.html',
  styleUrls: ['./tagresults.component.css']
})
export class TagresultsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private tagService:TagserviceService) { }

  pages = [];
  tid = -1;
  tname = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tid = params.tid;
      this.tname = params.tname;
      this.tagService.findPagesForTag(this.tid).then(response=>{
        this.pages=response;
      })
    });
  }
}
