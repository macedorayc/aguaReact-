import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cadastrar from './pages/app/cadastro';
import Consultar from './pages/app/listar';


export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Cadastrar/>} />
                <Route path='/listar' element={<Consultar/>} />
            </Routes>
        </BrowserRouter>
    );
}