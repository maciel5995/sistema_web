
import './App.css'
import { useEffect, useState } from 'react'

const url = 'http://localhost:3000/services'

function App() {
  // listar serviços - GET
  const [services, setServices] = useState([]);

  // cadastrar serviços
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    async function getServices(){
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      setServices(data);
    }

    getServices();
  },[]);

    const saveService = async (e) => {
      e.preventDefault();

      const cadastro = {
        date,
        service,
        price,
        customer
      }

      // console.log(cadastro)

      const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(cadastro)
      });

      const addedServices = await res.json();
      setServices((prevServices) => [...prevServices, addedServices]);

      setDate("");
      setService("");
      setPrice("");
      setCustomer("");
    }

  return (
    <>
      <h2>HTTP com React</h2>
      <h4>Lista de Serviços</h4>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Serviço</th>
            <th>Valor</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.date}</td>
              <td>{service.service}</td>
              <td>{service.price}</td>
              <td>{service.customer}</td>
            </tr>
          ))}
          
        </tbody>
      </table>

      <div className='form-container'>
        <form onSubmit={saveService}>
          <div className="form-group">
            <label>Data</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Serviço</label>
            <input type="text" value={service} onChange={(e) => setService(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Cliente</label>
            <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} />
          </div>

          <div className="form-group">
            <input type="submit" value="Cadastrar" />
          </div>

        </form>
      </div>
    </>
  )
}

export default App
