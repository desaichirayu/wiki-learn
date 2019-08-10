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
  entities = [];
  likeCount = 0;
  dislikeCount = 0;
  pageId = -1;
  usernote = '';

  //TODO:change
  userId = 1;

  validLike = false;
  validDislike = false;

  notes = ["hello","how are you"];




  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.title;
      this.detailsService.getSummary(this.title).then(summary => {
        this.summary = summary;
        this.detailsService.findPageExists(params.title,summary).then(coll=>{

          console.log(coll);
          this.likeCount = coll["likes"];
          this.dislikeCount = coll["dislikes"];
          this.pageId = coll["id"];
          this.entities = coll["entities"];

          this.detailsService.getNotes(this.pageId).then(response=>{

            this.notes = response;

          })




        });
      });


      this.detailsService.getPageImageURL(this.title).then(url => this.imageURL = url);



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
    this.detailsService.postNote(this.userId,this.pageId,this.usernote).then(note=>
    {
      this.notes.push(note);
    })
  };







}
