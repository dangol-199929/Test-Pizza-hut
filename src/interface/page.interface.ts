export interface IPageData {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  googletagmanager: string;
  metaChatPlugin: string;
  metapixel: string;
  rss: string;
  logo: string;
  twitter: string;
  googlemap: string;
  headerlogo: string;
  'max-price': string;
  'min-price': string;
  phone: string;
  'section1 address': string;
  'section1 description': string;
  'section1 email': string;
  'section1 mobile': string;
  'section1 title': string;
  'section2 content1': string;
  'section2 content2': string;
  'section2 content3': string;
  'section2 content4': string;
  'section2 content5': string;
  'section2 link1': string;
  'section2 link2': string;
  'section2 link3': string;
  'section2 link4': string;
  'section2 link5': string;
  'section2 link6': string;
  'section2 title': string;
  'section3 content1': string;
  'section3 content2': string;
  'section3 content3': string;
  'section3 title': string;
  'section4 appstore': string;
  'section4 appstore link': string;
  'section4 description': string;
  'section4 googleplay': string;
  'section4 googleplay link': string;
  'section4 title': string;
  'section5 facebook': string;
  'section5 instagram': string;
  'section5 youtube': string;
  sitelogo: string;
  sitelogo2: string;
  start_head: string;
  start_body: string;
  qr_code: string;
}

export interface ISchemeData {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  telephone: string;
  email: string;
  contactType: string;
}

export interface IPage {
  backgroundImage: string;
  description: string;
  id: number;
  pageData: Array<IPageData>;
  schemeTag: Array<ISchemeData>;
  position: string;
  slug: string;
  subTitle: string;
  thumbImage: string;
  title: string;
}
