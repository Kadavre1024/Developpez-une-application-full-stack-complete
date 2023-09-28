import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, of, take } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageResponse } from 'src/app/core/interfaces/message-response.interface';
import { Topic } from 'src/app/core/interfaces/topic.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { TopicApiService } from 'src/app/core/services/topic-api.service';
import { UserApiService } from 'src/app/core/services/user-api.service';
import { UserUpdate } from 'src/app/user-profil/interfaces/user-update.interface';
import { Login } from 'src/app/core/interfaces/login.interface';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
/**
 * UserProfil component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class UserProfilComponent implements OnInit {
  public userAuth: User = this.sessionService.user!
  public userProfil$: Observable<User> = this.userService.getUser(this.userAuth.id);
  public userId!: number;
  public topics$!: Observable<Topic[]>;
  public onError: boolean = false;
  public mybreakpoint: number = 1;
  public descriptionRowsView: number = 1;
  public descriptionHeightView: number = 40;
  public hide = true;

  public form !: FormGroup;
  private userLoginCredentials: Login = JSON.parse(localStorage.getItem('loginRequest')!);

  constructor(private sessionService: SessionService,
              private topicApiService: TopicApiService,
              private userService: UserApiService,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  /**
   * On init, initialize the form fields, get the authenticate user's details
   * to set the form fields, get the subscribed topic list for the authenticate user
   * and verify the screen size to adapt the DOM
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['*******', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });

    this.userProfil$.pipe(take(1)).subscribe(u => { 
      this.userId = u.id;
      this.form.setValue({userName: u.userName, email: u.email, password: this.userLoginCredentials.password})
      this.form.updateValueAndValidity();
    });

    this.topics$ = this.topicApiService.all().pipe(map((x) => this.getSubscribeTopicsForUser(x)));

    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  /**
   * Disable the SaveChangesButton if the form values are not modify
   * @returns false if one of the form values has been modify, else true
   */
  public disableSaveChangesBtn(): boolean{
    if(!this.form.invalid){
      if((this.form.controls['userName'].value !== this.userAuth.userName) || (this.form.controls['email'].value !== this.userAuth.email) || (this.form.controls['password'].value !== this.userLoginCredentials.password)){
        return false;
      }
    }
    return true;
  }

  /**
   * When click on submit button, call userService.update with params to update
   * to update user. If server response is OK, call a SnackBar with related message
   * then disconnect the user
   */
  public submit(): void {
      const userUpdateRequest = this.form.value as UserUpdate;
      this.userService.update(userUpdateRequest).pipe(take(1)).subscribe({
        next: (response: MessageResponse) => {
          this.matSnackBar.open("Changements sauvegardés !", 'Fermer', { duration: 3000 });
          this.disconnect();
        },
        error: () => this.onError = true
      });
  }

  /**
   * When click on disconnect link, call sessionService.logout to logout user
   * and remove remember and loginRequest items from localStorage.
   * Then open a SnackBar to tell "Session close" to user and redirect to homme page
   */
  public disconnect(): void{
    this.sessionService.logOut();
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('loginRequest');
    this.matSnackBar.open("Session fermée !", 'Fermer', { duration: 3000 });
    this.router.navigate(['/']);
  }

  /**
   * Unsubscribe a user to the topic by its id
   * @param id the user id
   */
  public unSubscribe(id: number): void {
    this.topicApiService.unSubscribe(id.toString(), this.userId.toString()).pipe(take(1)).subscribe(() => this.fetchSession());
  }

  /**
   * Verify the screen size to adapt the DOM
   * @param event
   */
  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  /**
   * Get the list of user subscribe's topics
   * @param topics Topic list
   */
  private getSubscribeTopicsForUser(topics : Topic[]): Topic[]{
    const filteredTopics: Topic[] = [];
    topics.forEach((topic) => {
      if(topic.users.includes(this.userId))
        filteredTopics.push(topic);
    });
    return filteredTopics;
      
  }

  /**
   * Get a Topic list
   */
  private fetchSession(): void {
    this.topics$ = this.topicApiService.all().pipe(map((x) => this.getSubscribeTopicsForUser(x)));
  }
}
