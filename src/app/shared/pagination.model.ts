export class Pagination {
  length: number;
  pageSize: number;

  constructor() {
    this.length = 0;
    this.pageSize = 10;
  }

  defaultPageSizeOptions() {
    return [10, 20, 50];
  }
}
