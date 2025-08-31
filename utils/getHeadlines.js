const axios = require('axios');
const timeago = require('timeago.js');
function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getHeadlines = async (date) => {
  console.log('start fetching headlines')
  try {
    const res = await axios.get(`https://www.reddit.com/r/books/hot.json?limit=10&t=day`, {
        headers: {
            'User-Agent': "hackernews-daily:bot:v1 (by /u/herseus)",
        }
    });
    const top10Objs = res.data.data.children.slice(-10);
    // console.log(top10Objs)
    const contents = top10Objs
      .map((obj, i) => {
        let { title, created, selftext, url, author, ups, num_comments } = obj.data;
        return `${i + 1}. **[${title}](${url})**
${ups} ups by ${author} ${formatTimestamp(created)} | [${num_comments} comments](${url})

`;
      })
      .join('');

    
    return `${contents}
<p  align="right"><a href="https://github.com/sponsors/timqian"> <i>❤️ Sponsor the author</i></a> </p>
`;
  } catch (error) {
    console.log(error);
    throw error
  }

}

module.exports = getHeadlines;


// getHeadlines(new Date())
