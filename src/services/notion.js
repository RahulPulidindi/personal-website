/* eslint-disable no-console */
// const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');

// Init client
// const notion = new Client({
//   auth: process.env.NOTION_TOKEN,
// });

async function getPages(start = null) {
  const notion = new Client({
    auth: 'secret_wS6rbWI2IFQbWWgGk4jLXgokYpZU1QuWKxo1xCHLrV9',
  });

  const pageResults = [];
  let results = [];

  if (!start) {
    const data = await notion.databases.query({
      database_id: '4cb58cd80b8546de943af3862513fe0a',
      sorts: [
        {
          property: 'Rating',
          direction: 'descending',
        },
      ],
      page_size: 11,
    });
    results = [...data.results];
  } else {
    const data = await notion.databases.query({
      database_id: '4cb58cd80b8546de943af3862513fe0a',
      sorts: [
        {
          property: 'Rating',
          direction: 'descending',
        },
      ],
      page_size: 11,
      start_cursor: start,
    });
    results = [...data.results];
  }

  for (let i = 0; i < results.length; i++) {
    const pageRetrieval = await notion.pages.retrieve({
      page_id: results[i].id,
    });

    const artists = [];
    const genres = [];

    pageRetrieval.properties['Artist(s)']?.multi_select.map(obj => {
      artists.push(obj.name);
    });

    pageRetrieval.properties['Genre']?.multi_select.map(obj => {
      genres.push(obj.name);
    });

    if (
      pageRetrieval.properties['Rating'].number !== null &&
      pageRetrieval.properties['Album Cover']?.files[0]?.file?.url
    ) {
      const resultObj = {
        id: pageRetrieval.id,
        title: pageRetrieval.properties['Album Title']?.title[0]?.plain_text,
        rating: pageRetrieval.properties['Rating'].number,
        cover_url: pageRetrieval.properties['Album Cover']?.files[0]?.file?.url,
        release_date: pageRetrieval.properties['Release Date'].rich_text[0]?.plain_text,
        artists: artists,
        genres: genres,
      };

      pageResults.push(resultObj);
    }
  }

  return pageResults;
}

exports.getPages = getPages;
