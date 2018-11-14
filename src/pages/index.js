import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import Tom from '../images/tom.svg';

const Container = styled.div`
  align-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
  height: 100%;
  margin: 0 auto;
  max-width: 480px;
`;

const ListOfLinks = styled.ul`
  list-style: none;

  li {
    display: inline-block;
  }
`;

export default class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
    };
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;

    this.updateCoordinates = this.updateCoordinates.bind(this);
  }

  updateCoordinates(event) {
    const x = event.pageX;
    const y = event.pageY;
    const multiplier = 5;
    const xVector = -(multiplier * (x - this.centerX)) / this.centerX;
    const yVector = -(multiplier * (y - this.centerY)) / this.centerY;

    this.setState({ x: yVector, y: xVector });
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.updateCoordinates);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.updateCoordinates);
  }

  render() {
    return (
      <Layout>
        <Container>
          <img
            src={Tom}
            style={{ width: '100%', transform: `rotateX(${this.state.x}deg) rotateY(${this.state.y}deg)` }}
          />
          <ListOfLinks />
        </Container>
      </Layout>
    );
  }
}
