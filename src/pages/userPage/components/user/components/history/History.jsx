import React, { useState } from 'react';
import HistoryModal from '../modals/historicoModal/HistoryModal';
import './history.scss';

export default function historicoCompras({ compras }) {
  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const [mostrarMais, setMostrarMais] = useState(false);
  const [compraSelecionada, setCompraSelecionada] = useState(null);

  const handleToggleMostrar = () => {
    setMostrarMais(!mostrarMais);
  };

  const handleAbrirModal = (compra) => {
    setCompraSelecionada(compra);
  };

  return (
    <div className='containerHistory'>
        <h2>Histórico de Compras</h2>
        {compras && compras.slice(0, mostrarMais ? compras.length : 3).map((compra, index) => (
          <ul key={index}>
            <li onClick={() => handleAbrirModal(compra)} className='itensCompra'>
              <h3 className='namesProducts'>Produtos: {compra.produto}...</h3>
              <h3>Valor Total: {BRL.format(compra.preco)}</h3>
            </li>
          </ul>
        ))}
        {!mostrarMais && compras && compras.length > 3 && (
          <a className='btnMost' onClick={handleToggleMostrar}>Mostrar Mais</a>
        )}
        {mostrarMais && (
          <a className='btnMost' onClick={handleToggleMostrar}>Mostrar Menos</a>
        )}
        {compraSelecionada && (
          <HistoryModal compra={compraSelecionada} onClose={() => setCompraSelecionada(null)} />
        )}
    </div>
  );
}