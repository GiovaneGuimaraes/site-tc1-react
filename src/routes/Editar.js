import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

function Editar() {
    const { index } = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [power, setPower] = useState({
        nome_do_poder: '',
        descricao: '',
        efeitos_colaterais: '',
        nota: '1' // Definimos um valor padrão aqui
    });

    useEffect(() => {
        const getPowers = () => {
            const powers = localStorage.getItem('powers');
            return powers ? JSON.parse(powers) : [];
        }

        const powers = getPowers();
        if (index >= 0 && index < powers.length) {
            setPower(powers[index]);
        }
    }, [index]);

    const savePowers = (powers) => {
        localStorage.setItem('powers', JSON.stringify(powers));
    }

    const updatePower = (e) => {
        e.preventDefault();
        const updatedPower = {
            nome_do_poder: power.nome_do_poder,
            descricao: power.descricao,
            efeitos_colaterais: power.efeitos_colaterais,
            nota: power.nota,
        };

        const powers = JSON.parse(localStorage.getItem('powers'));
        powers[index] = updatedPower;
        savePowers(powers);
        alert('Poder atualizado com sucesso!');
        navigate('/');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPower({
            ...power,
            [name]: value
        });
    };

    return (
        <body>
            <Navbar />
            <div>
                <div className="container">
                    <div className="form-container">
                        <form id="powerForm" ref={formRef} onSubmit={updatePower}>
                            <div className="form-group">
                                <label htmlFor="nome_do_poder">Nome do Poder:</label>
                                <input type="text" id="nome_do_poder" name="nome_do_poder" value={power.nome_do_poder} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição:</label>
                                <textarea id="descricao" name="descricao" rows="4" value={power.descricao} onChange={handleChange} required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="efeitos_colaterais">Efeitos Colaterais:</label>
                                <textarea id="efeitos_colaterais" name="efeitos_colaterais" rows="4" value={power.efeitos_colaterais} onChange={handleChange} required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nota">Nota:</label>
                                <select id="nota" name="nota" value={power.nota} onChange={handleChange} required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    );
}

export default Editar;
