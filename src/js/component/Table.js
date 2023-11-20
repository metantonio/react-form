import React, {useEffect, useState} from 'react';
import Card from './Card';
import styled from 'styled-components';

const StyledTable = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-area: table;
  padding-left: 30px;
 

  @media (min-width: 320px) and (max-width: 375px) {
    /* Estilos específicos para pantallas de iPhone en modo vertical */
    padding-left: 0px;  
    justify-content: center;
    padding-top: 50px;
  }

  @media (min-width: 376px) and (max-width: 414px) {
    /* Estilos específicos para pantallas de iPhone en modo vertical */
    padding-left: 0px;    
    justify-content: center;
    padding-top: 50px;
  }
`;

const Table = ({ cards, fold, refresh, pot }) => {
  const [widthCard, setWidthCard] = useState(80)
  useEffect(()=>{
    const handleResize = () => {
      if (window.innerWidth < 414) {
        // Realiza la acción que desees aquí
        console.log('El ancho de la pantalla es menor a 414px', window.innerWidth);
        setWidthCard(65)
      }else{
        setWidthCard(80)
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
  },[refresh])

  return (<>
    <StyledTable>
      {cards.map(card => (
        <Card key={`table${card.displayName}`} width={widthCard} shown card={card} />
      ))}      
    </StyledTable>
    <h4 className='text-center'>{`POT: ${pot==undefined? 0: pot}`}</h4>
    </>
  );
};

export default Table;
