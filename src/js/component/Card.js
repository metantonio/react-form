import React, {useEffect} from 'react';
import CardBack from '../assets/images/cardback.jpg';
import Logo from '../../img/logo.png'
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 100%;
  width: ${props => props.width}px;
  color: ${props => props.card.color};
  height: ${props => props.width * 1.4}px;
  background-color: ${props => (props.card.highlight ? 'skyblue' : 'white')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 3px 4px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  margin: ${props => props.width * 0.1}px;
  .card-back {
    width: 100%;
    height: 100%;
  }
  .card-title {
    font-family: Pokerface;
    font-size: ${props => props.width * 0.3}px;
    margin: 10% auto 20% auto;
    align-self: flex-start;
  }
  .card-suit {
    font-size: ${props => props.width * 0.4}px;
    display: flex;
    justify-content: center;
  }
  .card-logo {
    position: relative;
    top: -50%;
    left: 45%;
    transform: translate(-50%, -50%);
    max-width: 80%; /* Ajusta el tamaño de la imagen pequeña según tus necesidades */
    z-index: 2; /* Asegura que la imagen pequeña esté encima de la imagen grande */
    filter: brightness(0.5);
  }
`;

const Card = ({ shown, card, width, refresh }) => {
  useEffect(()=>{console.log("card loaded useEffect")},[refresh])

  if (!shown) {
    return (
      <StyledCard card={card} width={width}>
        <img className="card-back" src={CardBack} alt="Cardback" />
        <img className="card-logo" src={Logo} alt="Logo" />
      </StyledCard>
    );
  }
  return (
    <StyledCard card={card} width={width}>
      <h1 className="card-title">{card.short}</h1>
      <div className="card-suit">{card.suitEmoji}</div>
    </StyledCard>
  );
};

export default Card;
