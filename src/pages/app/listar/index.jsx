import { useState } from 'react'
import './index.scss'

import axios from 'axios'



export default function Consultar() {
    const [listaagua, setListaagua] = useState([]);


    async function buscar() {
        const url = 'http://localhost:5010/agua';
        let resp = await axios.get(url);
        setListaagua(resp.data);
    }

    

    return (
        <div className='pagina-consultar'>
            <h1> CONSULTAR </h1>

            <button onClick={buscar}>Buscar</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Classificação</th>
                        <th>Salinidade</th>
                        <th>Uso</th>
                    </tr>
                </thead>

                <tbody>
                    {listaagua.map(item =>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.classificacao}</td>
                            <td>{item.salinidade}</td>
                            <td>{item.uso}</td>
                  
                        </tr>
                    )}
                </tbody>

            </table>

           
        </div>
    )
}