export interface Card {
  img: string;
  imgPosition: Position;
  titleKey: string;
  topicKey?: string;
  day?: number;
  month?: number;
  year?: number;
  descriptionKey: string;
  link?: string;
}

export enum Position {
  TOP, BOTTOM, LEFT, RIGHT
}
