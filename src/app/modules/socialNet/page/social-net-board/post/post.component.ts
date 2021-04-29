
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '@app/service/auth.service';
import { environment } from '@env/*';
import { SnTextareaComponent } from '@shared/component/sn-textarea/sn-textarea.component';
import { IComment, INewComment, IPost } from 'src/app/data/new-post/schema/new-post.schema';
import { NewPostService } from 'src/app/data/new-post/service/new-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnChanges, OnInit{
  showMore: boolean = false;
  defaultProfilePicture: string = "../../../../../../assets/images/userIcon.png";
  partOfUrl: string = environment.apiUrl + "/";
  postImage: string;
  commentText: string;
  commentOwner: string;
  @Input('post') post: IPost;
  @ViewChild('snText') snText: SnTextareaComponent;

  constructor(private _authService: AuthService,
    private _postService: NewPostService) {}
  ngOnInit(): void {
   this.commentOwner = this._authService.currentUsernameValue;
  }

  ngOnChanges(): void {
    this.postImage = this.partOfUrl + this.post.postImage;
  }

  public onChange(commentContent){
    this.commentText = commentContent;
  }

  public sendComment(){
    const newComment: INewComment = {
    content: this.commentText,
    postId: this.post.postId
    }
    this._postService.addComment(newComment).subscribe(()=>{
      this.commentText = '';
      this.snText.clean();
    })
  }


}

