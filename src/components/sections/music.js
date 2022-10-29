import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { getPages } from '../../services/notion';
import { Stack, Card, Box, LinearProgress } from '@mui/material';
const json = require('../../../src/data/reviews.json');

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  //   align-items: flex-start;
  justify-content: space-evenly;
  min-height: 100vh;

  h1 {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 10px, var(--fz-md));
    font-weight: 400;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      margin-bottom: 8px;
    }

    // @media (max-width: 480px) {
    //   margin: 0 0 20px 2px;
    // }
  }

  h2 {
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 4px;
    }
  }

  h3 {
    // margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
    font-size: 26px;

    @media (max-width: 768px) {
      margin-top: 0px;
      //   font-size: var(-sm);
      font-size: 18px;
      margin-bottom: 8px;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 740px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    // margin-left: 15px;
    font-size: var(--fz-xs);
  }

  .cover {
    max-height: 250px;
    max-width: 250px;
    width: auto;
    height: auto;

    @media (max-width: 768px) {
      max-height: 128px;
      max-width: 128px;
      width: auto;
      height: auto;
    }
  }
`;

const Album = ({ title, rating, coverUrl, releaseDate, artists, genres }) => (
  <Stack
    direction="row"
    spacing={window.innerWidth > 768 ? 4 : 2}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={coverUrl} alt="demo.png" className="cover" />
    <Stack direction="column" justifyContent="center" alignItems="left">
      <h2 style={{ color: 'white' }}>{title}</h2>
      <Stack direction="row" alignItems="left">
        <h3>{artists.join(', ')}</h3>
      </Stack>
      <h1 style={{ fontSize: `${window.innerWidth > 768 ? '18px' : '12px'}`, color: 'white' }}>
        {releaseDate}
      </h1>
      <Stack direction="row" spacing={2} alignItems="left">
        <h1 style={{ fontSize: `${window.innerWidth <= 768 && '10px'}` }}>{genres.join(', ')}</h1>
      </Stack>
      <h1
        style={{
          color:
            rating >= 10
              ? 'deeppink'
              : rating > 8.25
              ? 'greenyellow'
              : rating < 7
              ? 'red'
              : 'yellow',
          fontSize: `${window.innerWidth > 768 ? '34px' : '14px'}`,
        }}>
        {rating}/10
      </h1>
    </Stack>
  </Stack>
);

const Music = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPageId, setLastPageId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPageCalled, setNextPageCalled] = useState(0);

  //   useEffect(() => {
  //     const getNotion = async () => {
  //       let results = [];
  //       setLoading(true);

  //       results = await getPages(lastPageId);
  //       setLoading(false);

  //       setLastPageId(results[results.length - 1]?.id);
  //       setPosts(posts.concat(results.slice(0, 10)));
  //     };

  //     getNotion();
  //   }, [nextPageCalled]);

  useEffect(() => {
    setLoading(true);
    setPosts(json);
    setLoading(false);
  }, []);

  const incrementPage = () => {
    setPageNumber(pageNumber + 1);
    setNextPageCalled(nextPageCalled + 1);
  };

  const decrementPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <StyledHeroSection style={{ marginTop: '48px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '44px', color: 'whitesmoke' }}>ALBUM REVIEWS</h2>
        <h1 style={{ marginBottom: '32px' }}>Some music I've been tracking since 2020.</h1>
      </div>
      {posts.length <= 0 || loading ? (
        <Box sx={{ width: '60%', margin: 'auto' }}>
          <div
            style={{
              marginBottom: '16px',
              textAlign: 'center',
            }}>
            Hold on, this may take around 10 seconds
          </div>
          <LinearProgress />
        </Box>
      ) : (
        <Fragment>
          {posts.slice((pageNumber - 1) * 10, pageNumber * 10)?.map(page => (
            <Card
              key={page.id}
              variant="outlined"
              sx={{
                width: `${window.innerWidth > 768 ? '85%' : '100%'}`,
                padding: '16px',
                marginBottom: '16px',
                display: 'flex',
                backgroundColor: '#020c1b',
              }}>
              <Album
                key={page.id}
                title={page.title}
                rating={page.rating}
                coverUrl={page.cover_url}
                releaseDate={page.release_date}
                artists={page.artists}
                genres={page.genres}
              />
            </Card>
          ))}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: `${window.innerWidth > 768 ? '85%' : '100%'}`,
              marginTop: '8px',
            }}>
            <button
              className="resume-button"
              onClick={() => {
                if (pageNumber > 1) {
                  decrementPage();
                }
              }}>
              Prev
            </button>
            <h1 style={{ fontSize: '20px', color: 'whitesmoke' }}>{pageNumber} / 22 </h1>
            <button className="resume-button" onClick={incrementPage}>
              Next
            </button>
          </div>
        </Fragment>
      )}
    </StyledHeroSection>
  );
};

export default Music;
