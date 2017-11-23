const BaseURL = 'https://api.douban.com/v2/';
// https://api.douban.com/v2/movie/search
var Douban_APIS = {
  /**
   * 图书搜索
   *    image: 图书缩略图
   *    title: 图书名称
   *    publisher 出本社
   *    author 作者
   *    price 价格
   *    pages 图书总页数
   *    summary 图书简介
   *    author_intro 作者简介
   */
  book_search: BaseURL + 'book/search',

  book_detail_id: BaseURL + 'book/',

  /**
   * 电影搜索
   *    images.medium 电影图像
   *    title 电影名称
   *    casts 电影演员 - 数据需要再处理
   *    rating,average 电影评分
   *    year 电影上映时间
   *    genres 电影标签
   *    alt 电影详情url
   */
  movie_search: BaseURL + 'movie/search'
}

export default Douban_APIS