import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Music } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const HobbyPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Music />
    </StyledMainContainer>
  </Layout>
);

HobbyPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default HobbyPage;
