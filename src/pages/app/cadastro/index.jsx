import '@fortawesome/fontawesome-free/css/all.min.css';

import { useState } from 'react';
import './index.scss';
import axios from 'axios';

export default function Cadastrar() {
    const [classificacao, setClassificacao] = useState('');
    const [salinidade, setSalinidade] = useState('');
    const [uso, setUso] = useState('');
    const [lista, setLista] = useState([]);
    const [alter, setAlter] = useState(-1);

    async function salvar() {
        if (!classificacao || !salinidade || !uso) {
            alert("Preencha todos os campos antes de salvar!");
            return;
        }

        const dados = { classificacao, salinidade, uso };

        if (alter === -1) {
            const url = 'http://localhost:5010/agua';
            let resp = await axios.post(url, dados);
            let id = resp.data.id;

            setLista([...lista, { ...dados, id }]);
        } else {
            const id = lista[alter].id;
            const url = `http://localhost:5010/agua/${id}`;
            await axios.put(url, dados);

            lista[alter] = { ...dados, id };
            setLista([...lista]);
            setAlter(-1);
        }

        limparCampos();
    }

    function limparCampos() {
        setClassificacao('');
        setSalinidade('');
        setUso('');
    }

    async function deletar(pos) {
        const id = lista[pos].id;
        const url = `http://localhost:5010/agua/${id}`;
        await axios.delete(url);

        lista.splice(pos, 1);
        setLista([...lista]);
    }

    function alterar(pos) {
        const item = lista[pos];
        setClassificacao(item.classificacao);
        setSalinidade(item.salinidade);
        setUso(item.uso);
        setAlter(pos);
    }

    async function buscar() {
        const url = 'http://localhost:5010/agua';
        let resp = await axios.get(url);
        setLista(resp.data);
    }

    return (
        <div className='pagina-cadastrar'>
            <h1>CADASTRAR AGUA</h1>

            <div className='form'>
                <input type='text' value={classificacao} onChange={e => setClassificacao(e.target.value)} placeholder='Classificação' />
                <input type='text' value={salinidade} onChange={e => setSalinidade(e.target.value)} placeholder='Salinidade' />
                <input type='text' value={uso} onChange={e => setUso(e.target.value)} placeholder='Uso' />
            </div>

            <button onClick={salvar}>Salvar</button>
            <button onClick={buscar}>Buscar</button>

            <div className="lista-agua">
                {lista.map((item, pos) => (
                    <div className="card" key={pos}>
                        <h2>Classificação: {item.classificacao}</h2>
                        <p>Salinidade: {item.salinidade}</p>
                        <p>Uso: {item.uso}</p>
                        <div className="card-actions">
                            <i className="fa-solid fa-trash" onClick={() => deletar(pos)}></i>
                            <i className="fa-solid fa-pen-to-square" onClick={() => alterar(pos)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
