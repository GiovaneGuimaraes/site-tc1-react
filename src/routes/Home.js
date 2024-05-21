import Footer from "../components/footer";
import Navbar from "../components/navbar";
import React, { useEffect, useRef } from 'react';

function Home() {
  const powersListRef = useRef(null);

  const getPowers = () => {
      const powers = localStorage.getItem('powers');
      return powers ? JSON.parse(powers) : [];
  }

  const savePowers = (powers) => {
      localStorage.setItem('powers', JSON.stringify(powers));
  }

  const deletePower = (index) => {
      const powers = getPowers();
      powers.splice(index, 1); // Remove o poder do array
      savePowers(powers); // Salva o array atualizado no localStorage
      populaDiv(powersListRef.current, powers); // Atualiza a exibição
  }

  const populaDiv = (div, listPower) => {
      div.innerHTML = '';
      listPower.forEach((power, index) => {
          const powerItem = document.createElement('div');
          powerItem.className = 'post';
          powerItem.setAttribute('data-index', index);
          powerItem.innerHTML = `
              <h2 class="post-title">${power.nome_do_poder}</h2>
              <p class="post-excerpt">${power.descricao}</p>
              <p><strong>Efeitos Colaterais:</strong> ${power.efeitos_colaterais}</p>
              <br>
              <p class="stars">${'★'.repeat(power.nota)}</p>
              <div class="post-actions">
                  <button> <a href="/editar/${index}"> Editar </a></button>
                  <button data-action="delete" data-index="${index}">Excluir</button>
              </div>
          `;
          div.appendChild(powerItem);
      });

      const deleteButtons = div.querySelectorAll('button[data-action="delete"]');
      deleteButtons.forEach(button => {
          button.addEventListener('click', (e) => {
              const index = e.target.getAttribute('data-index');
              deletePower(index);
              alert('Poder excluído com sucesso!');
          });
      });
  }

  useEffect(() => {
      const powersListDiv = powersListRef.current;
      const powers = getPowers();
      if (powersListDiv) {
          populaDiv(powersListDiv, powers);
      }
  }, []);

  return (
      <body>
        <Navbar />
        <main className="main">
            <div className="container" id="powersList" ref={powersListRef}></div>
        </main>
        <Footer />
      </body>
    );
  }
  
  export default Home;
  