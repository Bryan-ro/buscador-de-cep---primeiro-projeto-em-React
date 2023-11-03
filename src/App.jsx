import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import api from "./services/api"
import "./App.css"

function App () {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function searchCep () {
    if(!input) {
      alert("Preencha um CEP para procurar....")
      return;
    }
    
    try {
      const response = await api.get(`/${input}/json`);
      
      setCep(response.data)
    } catch {
      alert ("CEP inválido...")
      return;
    }

    setInput("");
  }


  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerText">
          <input type="text" placeholder="Digite seu CEP" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className="buttonSearch"><FiSearch size={25} color="#fff" onClick={searchCep}/></button>
      </div>

      <main className="main">
          <h2>Cep: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Municipio: {cep.localidade}, {cep.uf}</span>
      </main>
    </div>
  )
}

export default App
