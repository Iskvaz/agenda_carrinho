import React, { useState } from 'react';
import './Agendamento.css';

const HORARIOS = {
  MANHA: '09:00 - 11:00',
  MEIO: '11:00 - 13:00',
  TARDE: '13:00 - 16:00'
};

const PONTOS = {
  PAULISTA: {
    nome: 'AV. Paulista',
    maxParticipantes: 3
  },
  PARAISO: {
    nome: 'Paraíso',
    maxParticipantes: 2
  }
};

function Agendamento() {
  const [agendamentos, setAgendamentos] = useState({
    PAULISTA: {
      [HORARIOS.MANHA]: [],
      [HORARIOS.MEIO]: [],
      [HORARIOS.TARDE]: []
    },
    PARAISO: {
      [HORARIOS.MANHA]: [],
      [HORARIOS.MEIO]: [],
      [HORARIOS.TARDE]: []
    }
  });

  const handleSubmit = (ponto, horario, nome) => {
    if (!nome.trim()) {
      alert('Por favor, insira um nome válido');
      return;
    }

    const maxParticipantes = PONTOS[ponto].maxParticipantes;
    if (agendamentos[ponto][horario].length >= maxParticipantes) {
      alert('Horário já está lotado!');
      return;
    }

    setAgendamentos(prev => ({
      ...prev,
      [ponto]: {
        ...prev[ponto],
        [horario]: [...prev[ponto][horario], nome]
      }
    }));
  };

  const handleDelete = (ponto, horario, index) => {
    setAgendamentos(prev => ({
      ...prev,
      [ponto]: {
        ...prev[ponto],
        [horario]: prev[ponto][horario].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="agendamento-container">
      <h1>Agendamento de Carrinho</h1>
      
      {Object.entries(PONTOS).map(([pontoKey, ponto]) => (
        <div key={pontoKey} className="ponto-container">
          <h2>{ponto.nome}</h2>
          
          {Object.values(HORARIOS).map(horario => (
            <div key={horario} className="horario-container">
              <h3>{horario}</h3>
              <div className="participantes">
                {agendamentos[pontoKey][horario].map((nome, index) => (
                  <div key={index} className="participante">
                    {nome}
                    <button 
                      onClick={() => handleDelete(pontoKey, horario, index)}
                      className="delete-button"
                    >
                      ❌
                    </button>
                  </div>
                ))}
                
                {agendamentos[pontoKey][horario].length < ponto.maxParticipantes && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(pontoKey, horario, e.target.nome.value);
                      e.target.reset();
                    }}
                  >
                    <input
                      type="text"
                      name="nome"
                      placeholder="Digite seu nome"
                    />
                    <button type="submit">Agendar</button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Agendamento; 