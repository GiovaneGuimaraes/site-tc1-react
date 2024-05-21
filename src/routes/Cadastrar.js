import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

function Cadastrar() {
    const formRef = useRef(null);

    useEffect(() => {
      const form = document.getElementById('powerForm');
  
      const getPowers = () => {
          const powers = localStorage.getItem('powers');
          return powers ? JSON.parse(powers) : [];
      }
  
      const savePowers = (powers) => {
          localStorage.setItem('powers', JSON.stringify(powers));
      }
  
      const addPower = (e) => {
          e.preventDefault();
          const newPower = {
              nome_do_poder: document.getElementById('nome_do_poder').value,
              descricao: document.getElementById('descricao').value,
              efeitos_colaterais: document.getElementById('efeitos_colaterais').value,
              nota: document.getElementById('nota').value,
          };
          const powers = getPowers();
          powers.push(newPower);
          savePowers(powers);
          form.reset();
          alert('Poder criado com sucesso!');;
      }
  
      form.onsubmit = addPower;
    }, []);

    return (
      <body>
      <Navbar />
      <div>
        <div className="container">
          <div className="form-container">
            <form id="powerForm" ref={formRef}>
              <div className="form-group">
                <label htmlFor="nome_do_poder">Nome do Poder:</label>
                <input type="text" id="nome_do_poder" name="nome_do_poder" required />
              </div>
              <div className="form-group">
                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" rows="4" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="efeitos_colaterais">Efeitos Colaterais:</label>
                <textarea id="efeitos_colaterais" name="efeitos_colaterais" rows="4" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="nota">Nota:</label>
                <select id="nota" name="nota" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="form-group">
                <button type="submit">Cadastrar Poder</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      </body>
    );
}

export default Cadastrar;
