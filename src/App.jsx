import { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Button";
import {formatearDinero, calcularTotalPagar} from "./helpers"


function App() {
  // Todo mi codigo js se tiene que hacer arriba antes del return...
  //El state lo creamos mayormente cuando hay alguna variable que puede ser modificada luego...
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0)
  const [pago, setPago] = useState(0)
  
  useEffect(() =>{
    setTotal(calcularTotalPagar(cantidad,meses))

   
    //Se va a ejecutar este bloque de codigo cuando esto valores de aqui cambien/ carguen
  },[cantidad,meses, total])

  useEffect(() => {
    setPago(total / meses)
  },[total])
  
  function handleChange(e){
    //Para modificar una variable que sea un State se necesita hacer esto
    setCantidad(+e.target.value)
  }

  const min=0
  const max=20000
  const step=100

  function handleClickDecremento(){
    const valor = cantidad - step;

    if(valor < min){
      alert("Cantidad no valida")
      return;
    }

    setCantidad(valor)
  }

  function handleClickIncremento(){
    const valor = cantidad + step;

    if(valor > max){
      alert("Cantidad no valida")
      return;
    }

    setCantidad(valor)
  }
  return (
     <div className="my-20 max-w-lg mx-auto bg-white shadow p-4">
        <Header/>

        <div className="flex justify-between my-14">
          <Button
            operador="-"
            fn= {handleClickDecremento}
          />
          <Button
            operador="+"
            fn={handleClickIncremento}
          />
        </div>
        <input type="range"
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600" 
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          value={cantidad}
        />

        <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
          {formatearDinero(cantidad)}
        </p>

        <h2
        className="text-2xl font-extrabold text-gray-500 text-center">
          Elige un <span className=" text-indigo-600">Plazo</span> a pagar
        </h2>

        <select
          className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center
          text-xl font-bold text-gray-500"
          value={meses}
          onChange={e => setMeses(e.target.value)}
        >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
        </select>


        <div 
          className="my-5 space-y-3 bg-gray-50 p-5"
        >
        <h2
          className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className=" text-indigo-600">de pagos</span>
        </h2>
        <p
          className="text-xl text-gray-500 text-center font-bold"
        >
          {meses} Meses
        </p>
        <p
          className="text-xl text-gray-500 text-center font-bold"
        >
          {formatearDinero(total)} Total a pagar
        </p>        <p
          className="text-xl text-gray-500 text-center font-bold"
        >
          {formatearDinero(pago)} Mesuales
        </p>
        </div>
     </div>
  )
}

export default App
