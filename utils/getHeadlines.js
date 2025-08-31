const axios = require('axios');
const timeago = require('timeago.js');

const getHeadlines = async (date) => {
  console.log('start fetching headlines')
  try {
    // end of the date
    const endTime = Math.round(new Date(date).getTime() / 1000);
    // 1 hour before start of the date (save missed posts)
    const startTime = Math.round(new Date(date).getTime() / 1000) - (25 * 60 * 60);
    const res = await axios.get(`https://www.reddit.com/r/books/hot.json?limit=10&t=day`, {
        headers: {
            'User-Agent': "hackernews-daily:bot:v1 (by /u/herseus)",
        }
    });
    const top10Objs = res.data.hits.slice(-10);
    // console.log(top10Objs)
    const contents = top10Objs
      .map((obj, i) => {
        let { title, created, selftext, url, author, ups, num_comments } = obj;
        return `${i + 1}. **[${title}](${url})**
${ups} ups by ${author} ${timeago.format(created)} | [${num_comments} comments](${url})

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
