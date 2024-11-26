export interface Card {
  img: string;
  imgPosition: Position;
  title: string;
  topic?: string;
  date?: string;
  description: string;
  link?: string;
}

export enum Position {
  TOP, BOTTOM, LEFT, RIGHT
}
