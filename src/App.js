import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SelectionContext } from './selectionContext';
import NewStorePage from './NewStorePage';
import AccountPage from './AccountPage';

export default function App() {
  const [selecionados, setSelecionados] = React.useState([]);

  const limparSelecao = () => setSelecionados([]);

  return (
    <SelectionContext.Provider value={{ selecionados, setSelecionados, limparSelecao }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewStorePage />} />
          <Route path="/conta" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </SelectionContext.Provider>
  );
}
