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
  entities = '';
  likeCount = 0;
  dislikeCount = 0;
  pageId = -1;

  //TODO:change
  userId = 1;

  validLike = false;
  validDislike = false;


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.title;
      this.detailsService.getSummary(this.title).then(summary => {
        this.summary = summary;
        // this.detailsService.getEntities(this.title,summary).then(entities =>{
        //   this.entities=entities["entities"]
        // });
      });



      this.detailsService.getPageImageURL(this.title).then(url => this.imageURL = url);
      this.detailsService.findPageExists(params.title).then(coll=>{

        console.log(coll);
        this.likeCount = coll["likes"];
        this.dislikeCount = coll["dislikes"];
        this.pageId = coll["id"];

      });


    })
  }

  likePage = () =>{
    this.detailsService.postLike(this.userId,this.pageId).then(upvotes=>{
      this.validLike = upvotes[0];
      this.likeCount = upvotes[1];
    });
  };

  dislikePage = () =>{
    this.detailsService.postDislike(this.userId,this.pageId).then(downvotes=>{
      this.validDislike = downvotes[0];
      this.dislikeCount = downvotes[1];
    });
  };

  addNote = () =>{
    //
  };







}
