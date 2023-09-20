import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of, take } from 'rxjs';



import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from 'src/app/core/interfaces/message-response.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { TopicApiService } from 'src/app/core/services/topic-api.service';
import { UserApiService } from 'src/app/core/services/user-api.service';
import { UserUpdate } from 'src/app/user-profil/interfaces/user-update.interface';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  public userAuth: User = this.sessionService.user!
  public userProfil$: Observable<User> = this.userService.getUser(this.userAuth.id);
  public userId!: number;
  public topics$!: Observable<Topic[]>;
  public onError: boolean = false;
  public mybreakpoint: number = 1;
  public descriptionRowsView: number = 1;
  public descriptionHeightView: number = 40;

  public form !: FormGroup;

  private userInfo!: User;

  constructor(private sessionService: SessionService,
              private topicApiService: TopicApiService,
              private userService: UserApiService,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.userProfil$.pipe(take(1)).subscribe(u => { 
      this.userId = u.id;
      this.form.setValue({userName: u.userName, email: u.email})
      this.form.updateValueAndValidity();
    });

    this.topicApiService.all().pipe(take(1)).subscribe((x) => this.getSubscribeTopicsForUser(x))

    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  public disableSaveChangesBtn(): boolean{
    if(!this.form.invalid){
      if((this.form.controls['userName'].value !== this.userAuth.userName) || (this.form.controls['email'].value !== this.userAuth.email)){
        return false;
      }
    }
    return true;
  }

  public submit(): void {
      const userUpdateRequest = this.form.value as UserUpdate;
      this.userService.update(userUpdateRequest).pipe(take(1)).subscribe({
        next: (response: MessageResponse) => {
          this.matSnackBar.open(response.message, 'Close', { duration: 3000 });
          this.disconnect();
        },
        error: () => this.onError = true
      });
  }

  public disconnect(): void{
    this.sessionService.logOut();
    localStorage.removeItem('loginRegister');
    this.matSnackBar.open("Session closed !", 'Close', { duration: 3000 });
    this.router.navigate(['/']);
  }

  public unSubscribe(id: number): void {
    this.topicApiService.unSubscribe(id.toString(), this.userId.toString()).pipe(take(1)).subscribe(() => this.fetchSession());
  }

  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  private getSubscribeTopicsForUser(topics : Topic[]): void{
    const filteredTopics: Topic[] = [];
    topics.forEach((topic) => {
      if(topic.users.includes(this.userId))
        filteredTopics.push(topic);
    });
    if(filteredTopics != null){
      this.topics$ = of(filteredTopics);
    }else{
      this.topics$ = of();
    }
      
  }

  private fetchSession(): void {
    this.topicApiService.all().pipe(take(1)).subscribe((x) => this.getSubscribeTopicsForUser(x));
  }
}
