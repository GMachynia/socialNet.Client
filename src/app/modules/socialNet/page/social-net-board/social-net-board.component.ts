
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '@app/service/auth.service';
import { SocialNetSignalRService } from '@app/service/social-net-signal-r.service';
import { SnTextareaComponent } from '@shared/component/sn-textarea/sn-textarea.component';
import { fromEvent, Observable, Subject} from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IPost } from 'src/app/data/new-post/schema/new-post.schema';
import { NewPostService } from 'src/app/data/new-post/service/new-post.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-social-net-board',
  templateUrl: './social-net-board.component.html',
  styleUrls: ['./social-net-board.component.scss']
})
export class SocialNetBoardComponent implements OnInit, OnDestroy {

  newPostText: string = "";
  formModel: FormGroup;
  addPostStatus = false;

  @ViewChild('snText') textArea: SnTextareaComponent;
  
  currentUsername: string;
  posts: IPost[] = [];
  page: number = 1;
  pageSize: number = 5;

  isLoading = false;
  loadedAll = false;
  isFirstLoad = true;

  destroy$: Subject<boolean> = new Subject();
  scrollEvent$: Observable<any>;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _newPostService: NewPostService,
    private _signalRService: SocialNetSignalRService,
    ) { 
      this.scrollEvent$ = fromEvent(window, 'scroll').pipe(
        takeUntil(this.destroy$),
        debounceTime(400), 
        distinctUntilChanged());   
    }


  ngOnInit(): void {
    this._signalRService.getNewPostNotification$()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.posts.unshift(res);
    });
    this._signalRService.getNewCommentNotification$()
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      const post: IPost = this.posts.find(p => p.postId == res.postId);
      post.comments.push(res);
    });

    this.formModel = this._formBuilder.group({
      image: null
    });
    this.currentUsername = this._authService.currentUsernameValue;
   
    this.getPosts();
    this.scrollEvent$.subscribe(() => {
      if ((window.scrollY) >= document.body.offsetHeight) {
        if (!this.loadedAll) {
          this.paginatePage();
          this.getPosts();
        }
      }
    });
  }

  ngOnDestroy(): void {
   this.destroy$.next(true);
   this.destroy$.complete();
  }

  public get formModelControls() { return this.formModel.controls; }
 
  public onChange(text){
    this.newPostText = text;
  }

   private paginatePage(): void {
    this.page++;
  }

   private getPosts(): void {
      this.isLoading = true;
      this._newPostService.getPosts(this.page, this.pageSize).subscribe(res => {
        if (res.length) {
            this.posts.push(...res);
        } else {
            this.loadedAll = true;
        }
      this.isLoading = false;
      this.isFirstLoad = false;
        });
   }    

  public addPost (files) {
    const formData = new FormData();
        if(!this.newPostText){
          return;
        }
        if(files[0] && this.newPostText){
          let fileToUpload = <File>files[0];
          const fileExt = fileToUpload.name.split('.').pop();
          const myNewFile = new File([fileToUpload], this.currentUsername + "." + fileExt , {type: fileToUpload.type});
          formData.append('image', myNewFile, myNewFile.name);
          this._newPostService.addPostImage(formData).pipe(concatMap(res => this._newPostService.addPostWithoutImage({postImage: res.dbPath, postContent: this.newPostText}))).subscribe(res=>{
            this.resetNewPostForm();
          });
        }
        else{
          this._newPostService.addPostWithoutImage({postContent: this.newPostText}).subscribe(() =>{
            this.resetNewPostForm();
          });
        }
      }

      private resetNewPostForm(){
        this.newPostText = "";
        this.formModelControls.image.reset();
        this.textArea.clean();
      }

      
}


