import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import styled from 'styled-components';

const StyledAI = styled.div`
  grid-area: ${props => (props.id === "player1" ? "player3" : props.id)};
  margin: 0 auto;
  width: 85%;
  height: 120px;
  border: 3px solid #411f18;
  /* background-color: rgb(0, 61, 0); */
  border-radius: 5px;
  padding: 3px;
  max-width: ${props => (props.top ? '180px' : 'auto')};
  h4 {
    margin: 0px auto;
    text-align: center;
    font-family: Courgette;
    font-size: 1rem;
  }
  .ai {
    .ai-card-container {
      display: flex;
      width: 100%;
      flex-direction: row;
      margin: 0 auto;
      justify-content: center;
    }
  }
`;

const AI = ({ data, showCards, turn, refresh }) => {
  const [widthCard, setWidthCard] = useState(60)
  const cardContainer = data.active ? (
    data.hand.map(card => (
      <Card
        key={`${data.id + card.displayName}`}
        width={widthCard}
        shown={showCards}
        card={card}
        location="ai"
        refresh={refresh}
      />
    ))
  ) : (
    <p>Folded!</p>
  );

  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 414) {
        // Realiza la acción que desees aquí
        console.log('El ancho de la pantalla es menor a 414px', window.innerWidth);
        setWidthCard(40)
      } else {
        setWidthCard(60)
      }
    };

    // Agregar un listener para el evento 'resize' del objeto window
    console.log("se agrega un evento para detectar ancho de la ventana: ", window.innerWidth)
    window.addEventListener('resize', handleResize);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log("se eliminar un evento para detectar ancho de la ventana: ")
    };
  }, [refresh])

  return (
    <StyledAI top={data.id === 'player3'} id={data.id.slice(-1) < 4 ? data.id === 'player1' ? `ai2` : `ai${data.id.slice(-1)}` : `ai1`}>
      <h4>{`Player ${data.id.slice(-1)}: ${data.name} ${data.active ? '' : ' (folded)'} $${data.points}`}</h4>{`${turn == data.name ? 'Waiting to select' : ''}`}
      <div className="ai">
        <div className="ai-card-container">{cardContainer}</div>
      </div>
    </StyledAI>
  );
};

export default AI;
