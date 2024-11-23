export interface Card {
  img: string;
  imgPosition: Position;
  title: string;
  description: string;
  link?: string;

  height?: number;
  width?: number;
}

export enum Position {
  TOP, BOTTOM, LEFT, RIGHT
}
