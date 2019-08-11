import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../services/details.service";
import {UserService} from "../services/user.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-page.details',
  templateUrl: './page.details.component.html',
  styleUrls: ['./page.details.component.css']
})
export class PageDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private detailsService: DetailsService, private userService:UserService,private cookieService:CookieService) { }

  title = '';
  summary = '';
  imageURL = '';
  entities = [];
  likeCount = 0;
  dislikeCount = 0;
  pageId = -1;
  usernote = '';

  //TODO:change
  userId = -1;
  //TODO:change
  usertype = -1;

  validLike = false;
  validDislike = false;

  notes = [];
  editable = [];




  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params.title;

      this.userService.authenticate(this.cookieService.get("user")).then(response=>{

        if(response!=null){
          this.userId = response['id'];
          if(response.ipAddress){
            this.usertype=0;
          }
          else {
            this.usertype = 1;
          }
        }
      });


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
            this.editable=[].fill(false,0,this.notes.length);

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

  getUTC(x){

    var d = new Date(x);
    return d.toUTCString();

  }

  addNote = () =>{
    this.detailsService.postNote(this.userId,this.pageId,this.usernote).then(note=>
    {
      this.notes.push(note);
    })
  };


  deleteNote = (nid) => {

    this.detailsService.deleteNote(nid).then(()=>{
      this.detailsService.getNotes(this.pageId).then(response=>{
        this.notes = response;
        this.editable=[].fill(false,0,this.notes.length);
      })
    });


  };

  updateNote = (content,i)=>{

    var notei = this.notes[i];
    var nid = notei['id'];
    notei["content"]=content;
    this.editable[i]=false;
    this.detailsService.updateNote(notei,nid).then(note=>{

      this.notes[i]=note;

    })

  };

  editNote=(i)=>{

    this.editable[i]=true;
  }





}
