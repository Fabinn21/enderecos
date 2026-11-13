
import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false)
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(null)
  const [erro, setErro] = useState('')

  async function  buscarCep(e, cepSelecionado= cep) {
    e.preventDefault()

    const cepLimpo = cepSelecionado.replace(/|D/g,'')

    if (cepLimpo.length !== 8){
      setErro('Digite um CEP válido com 8 número.')
      setEndereco(null)
      return
    }
      setLoading(true)
      setErro('')
      setEndereco(null)
    
    try{
      const resposta = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)

      if (resposta.data.erro) {
        setErro('CEP não encontrado')
        return
      }

      setEndereco(resposta.data)
      return resposta.data
    } catch (e){
      setErro('Erro ao consultar o CEP. Tente novamente.')

    } finally {
      setLoading(false)
    }
  
    }





  return (
    <div>
        <div>
        <h1>Buscador de CEP</h1>

        <p>Digite um CEP para encontrar um endereço</p>

        <form onSubmit={buscarCep}>
          <input type="text" placeholder='Ex: 01001000' maxLength={9}
             onChange={e => setCep(e.target.value)} />
            

          <button type='submit' disabled={loading}>{loading ? 'Buscando...' : 'Buscar CEP'}</button>
        </form>

        {loading && (<p>Consultando endereço...</p>)}

        {erro && <p>{erro}</p>}

        {endereco && (
          <div>
            <h2>Endereço encontrado!</h2>
            <p><strong>CEP:</strong> {endereco.cep}</p>
            <p><strong>Rua:</strong> {endereco.logradouro || 'não informado'} </p>
            <p><strong>Bairro:</strong> {endereco.bairro || 'não informado'}</p>
            <p><strong>Cidade:</strong>{endereco.localidade}</p>
            <p><strong>Estado:</strong> {endereco.uf}</p>
          </div>
        )}

      </div>
    </div>
  )

}

export default App
