import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import client from './client'
import Logo from './components/Logo'

import Address from './fragments/Address'
import Registry from './fragments/Registry'
import Transaction from './fragments/Transaction'

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Wrapper>
        <Header>
          <Container>
            <Title>
              <Logo />
              <span>Explorer</span>
            </Title>
            <Subtitle>View reference transactions on the Ethereum blockchain</Subtitle>
          </Container>
        </Header>
        <Content>
          <Container>
            <h2>
              Recording references on the blockchain ensures they are stored and authenticated in a transparent and
              trustworthy fashion—permanently—so that they only need to be recorded once and candidates can reuse them
              throughout their careers. Candidate reference data is verified and cannot be accessed or changed by
              anybody else including the Zinc team.
            </h2>
            <Switch>
              <Route path="/tx/:hash" component={Transaction} />
              <Route path="/:address" component={Address} />
              <Route path="/" exact={true} component={Registry} />
            </Switch>
          </Container>
        </Content>
      </Wrapper>
      <Footer>
        <span>
          Made with <b>❤</b> by&nbsp;
        </span>
        <a href="https://github.com/sistemico/zinc-explorer" target="_blank" rel="noopener noreferrer">
          sistemico
        </a>
        <span>&nbsp;using&nbsp;</span>
        <a href="https://thegraph.com/" target="_blank" rel="noopener noreferrer">
          The Graph
        </a>
      </Footer>
    </Router>
  </ApolloProvider>
)

const Wrapper = styled.main`
  flex: 1 1 100%;
  margin: auto;
  width: 100%;
  min-height: 100vh;
`

const Container = styled.article`
  flex: 1 1 100%;
  margin: auto;
  padding: 1rem;
  width: 100%;

  @media only screen and (min-width: 960px) {
    max-width: 900px;
  }

  @media only screen and (min-width: 1264px) {
    max-width: 1185px;
  }

  @media only screen and (min-width: 1904px) {
    max-width: 1785px;
  }

  @media only screen and (max-width: 599px) {
    padding: 24px;
  }
`

const Header = styled.header`
  padding-top: 3rem;
  padding-bottom: 3rem;
  background: var(--backgroud-color);
  color: white;

  ${Container} {
    padding: 0 1rem;
  }
`

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  font-size: 2.625rem;
  font-weight: 700;

  span {
    margin-left: 1rem;
  }
`

const Subtitle = styled.p`
  margin-bottom: 0;
  margin-block-start: 1rem;
  font-size: 1.25rem;
  color: var(--text-light-color);
`

const Content = styled.section`
  ${Container} {
    padding: 3rem 1rem;
  }

  h2 {
    margin: 0.5rem 0;
    line-height: 1.75rem;
  }

  h3 {
    margin: 1.8rem 0 1.5rem;
    color: var(--text-light-color);
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 1rem;
  font-size: 90%;

  b {
    color: var(--link-color);
  }
`

export default App
