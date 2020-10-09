import { AvatarAPIModel } from '../models/avatarAPIModel';

export class CalculateMetrics {
  manageDetails(avatarDetails: AvatarAPIModel): AvatarAPIModel {
    avatarDetails.vitality = avatarDetails.strength + 3;
    avatarDetails.evasion = avatarDetails.dexterity + 10;
    avatarDetails.armor = avatarDetails.evasion;
    avatarDetails.alacrity = avatarDetails.dexterity + avatarDetails.mind;
    avatarDetails.tenacity = (avatarDetails.tenacity === 0) ? 1 + avatarDetails.presence : avatarDetails.tenacity;
    return avatarDetails;
  }
}
