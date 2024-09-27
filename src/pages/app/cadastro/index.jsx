
import { Link } from 'react-router-dom';
import { useState } from 'react'
import './index.scss'
import axios from 'axios'



export default function Cadastrar() {
    const [classificacao, setClassificacao] = useState('');
    const [salinidade, setSalinidade] = useState('');
    const [uso, setUso] = useState('');


    async function salvar() {
        const paramCorpo = {
            "classificacao":classificacao,
            "salinidade": salinidade,
            "uso": uso,
      
        }

        const url = 'http://localhost:5010/agua';
        let resp = await axios.post(url, paramCorpo);

        alert('Pessoa adicionada na lista agua. Id: ' + resp.data.novoId);
    }


    return (
        <div className='pagina-cadastrar'>
            <h1> CADASTRAR AGUA </h1>
            
         <Link to='/listar'> Consultar</Link>

            <div className='form'>
                <div>
                    <label>Classificacao:</label>
                    <input type='text' value={classificacao} onChange={e => setClassificacao(e.target.value)}/>
                </div>
                <div>
                    <label>Salinidade:</label>
                    <input type='text' value={salinidade} onChange={e => setSalinidade(e.target.value)} />
                </div>
                <div>
                    <label>Uso:</label>
                    <input type='text' value={uso} onChange={e => setUso(e.target.value)} />
                </div>
              
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}