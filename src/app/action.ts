export class Action {
  title: string;
  profit: number;
  oldCost: number;
  newCost: number;
  address: string;
  phone: string;
  category: number;
  subCategory: number;
  workTime: {
    weekdays: { start: string, end: string },
    saturday: { start: string, end: string },
    sunday: { start: string, end: string }
  };
  image: string;
  site: string;
  information: string;
  socialNetworks: {
    instagram: string,
    twitter: string,
    facebook: string,
    vk: string
  };
  createTime: number;
  isInteresting: boolean;
  isCategoryTop: boolean;
  id: number;
  partnerId: number;
  originId: number;
  timeUpdate: number;
  actionBefore: number;
}
