export interface IBlogItem {
  createdBy: string;
  backgroundImage: string;
  created_date: any | undefined;
  createdAt: any | undefined;
  content: string;
  featured: boolean;
  id: number;
  pageData: any | undefined;
  position: string;
  slug: string;
  subTitle: string;
  thumbImage: string;
  title: string;
  thumbnail: string;
  image: string;
}

export interface IBlog {
  data: IBlogContent[];
}

export interface IBlogContent {
  content: string;
  createdAt: string;
  createdBy: string;
  id: number;
  image: string;
  imageAltText: null;
  slug: string;
  status: true;
  thumbnail: string;
  thumbnailAltText: null;
  title: string;
  type: string;
}
