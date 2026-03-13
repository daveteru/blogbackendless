export interface Blog {
  objectId: string;
  title: string;
  author: string;
  bodytext: string;
  quote: string;
  thumbnail: string | null;
  writedate: number;
  created: number;
  updated: number;
  ownerId: string | null;
  ___class: string;
}
