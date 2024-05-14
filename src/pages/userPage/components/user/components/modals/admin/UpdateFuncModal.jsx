import React from 'react';

export default function UpdateFuncModal({ funcionarios, onSelect }) {
  return (
    <div className="modal funcionario-list-modal" onClick={(e) => e.stopPropagation()}>
      <div className="containerModal">
        <h2>Lista de Funcionários</h2>
        <ul>
          {funcionarios.map((funcionario, index) => (
            <li key={index} onClick={() => onSelect(funcionario)}>
              {funcionario.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};