export interface PageInfo {
  domain: string;
  userId: string;
  referrer: string;
  url: string;
  loadTime: number;
}
export interface PageLoadInfo {
  domain: string;
  userId: string;
  url: string;
  loadTime: number;
}
export interface PageViewCountInfo {
  domain: string;
  url: string;
  date: string;
}
