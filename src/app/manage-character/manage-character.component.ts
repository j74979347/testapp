import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Avatars } from '../shared/avatars';
import { AvatarAPIModel } from '../shared/models/avatarAPIModel';
import { Options } from 'ng5-slider';
import { CalculateMetrics } from '../shared/utils/calculateMetrics';
@Component({
  selector: 'app-manage-character',
  templateUrl: './manage-character.component.html',
  styleUrls: ['./manage-character.component.scss']
})
export class ManageCharacterComponent implements OnInit {
  @Input() avatarDetails: AvatarAPIModel;
  @Input() createNewAvatar: boolean;
  @Output() cancelEvent = new EventEmitter<string>();
  @Output() saveEvent = new EventEmitter<AvatarAPIModel>();
  currentSlide = 0;
  defaultAvatar = 1;
  avatarSource: string;
  avatars: any;
  options: Options = {
    floor: 0,
    ceil: 10
  };
  disabledOptions = new Options();
  constructor() {
   }

  ngOnInit() {
    this.disabledOptions.floor = this.options.floor;
    this.disabledOptions.ceil = this.options.ceil;
    this.disabledOptions.disabled = true;
    this.manageDetails();
    this.getAvatarSource(this.avatarDetails.id);
    this.avatars = Avatars;
  }

  manageDetails() {
    this.avatarDetails = new CalculateMetrics().manageDetails(this.avatarDetails);
    this.avatarDetails.vitality = this.avatarDetails.strength + 3;
    this.avatarDetails.evasion = this.avatarDetails.dexterity + 10;
    this.avatarDetails.armor = this.avatarDetails.evasion;
    this.avatarDetails.alacrity = this.avatarDetails.dexterity + this.avatarDetails.mind;
    this.avatarDetails.tenacity = (this.avatarDetails.tenacity === 0) ? 1 + this.avatarDetails.presence : this.avatarDetails.tenacity;
  }

  getAvatarSource(id = this.defaultAvatar) {
    this.avatarSource = Avatars.filter(x => x.id === id)[0].source;
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.avatars.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.avatars.length ? 0 : next;
  }

  cancel() {
    this.cancelEvent.emit();
  }

  save() {
    if (this.createNewAvatar) {
      const details = Avatars.filter(x => x.id === this.currentSlide + 1)[0];
      this.avatarDetails.id = details.id;
      this.avatarDetails.name = details.name;
      this.avatarDetails.guid = this.newGuid();
    }
    this.saveEvent.emit(this.avatarDetails);
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
