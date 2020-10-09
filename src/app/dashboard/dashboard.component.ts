import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageCharacterComponent } from '../manage-character/manage-character.component';
import { AvatarAPIModel } from '../shared/models/avatarAPIModel';
import { NgModel } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { CalculateMetrics } from '../shared/utils/calculateMetrics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  avatars = new Array<AvatarAPIModel>();
  newAvatars = new AvatarAPIModel();
  createNewAvatar = false;
  currentSlide = 0;
  @ViewChild(ManageCharacterComponent, {static: false}) carousel: ManageCharacterComponent;
  constructor() {

    // will be API Driven

    let model = new AvatarAPIModel();
    model.dexterity = 5;
    model.guid = '123';
    model.id = 1;
    model.mind = 6;
    model.name = 'Avatar 1';
    model.presence = 8;
    model.strength = 8;
    model.tenacity = 1;
    this.avatars.push(model);

    model = new AvatarAPIModel();
    model.dexterity = 6;
    model.guid = 'njj';
    model.id = 2;
    model.mind = 7;
    model.name = 'Avatar 2';
    model.presence = 5;
    model.strength = 5;
    model.tenacity = 4;
    this.avatars.push(model);

    model = new AvatarAPIModel();
    model.dexterity = 7;
    model.guid = 'cde';
    model.id = 3;
    model.mind = 8;
    model.name = 'Avatar 3';
    model.presence = 6;
    model.strength = 6;
    model.tenacity = 3;
    this.avatars.push(model);

    model = new AvatarAPIModel();
    model.dexterity = 8;
    model.guid = 'asa';
    model.id = 4;
    model.mind = 8;
    model.name = 'Avatar 4';
    model.presence = 7;
    model.strength = 7;
    model.tenacity = 2;
    this.avatars.push(model);
   }

  ngOnInit() {
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.avatars.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.avatars.length ? 0 : next;
  }

  newAvatar() {
    this.newAvatars = new AvatarAPIModel();
    this.createNewAvatar = true;
  }

signOut() {
  Auth.signOut().then(user => {
  })
    .catch(err => console.log(err));
}

cancelEvent() {
  this.createNewAvatar = false;
}

saveEvent($event: AvatarAPIModel, guid) {
  if (this.createNewAvatar) {
    this.avatars.push($event);
  } else {
    const updatedItem = this.avatars.find(x => x.guid === guid);
    const index = this.avatars.indexOf(updatedItem);
    this.avatars[index] = $event;
    this.avatars[index] = new CalculateMetrics().manageDetails(this.avatars[index]);
  }
  this.createNewAvatar = false;
}

}
