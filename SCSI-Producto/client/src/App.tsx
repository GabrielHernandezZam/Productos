import CrearProducto from "./components/Productos/CrearProducto";
import ProductosList from "./components/Productos/ProductosList";

function App() {
  return (
    <>
      {/* Centrar en pantalla y sepacion de 20*/}
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Seguros de las Californias
          <span className="text-orange-500"> Productos </span>
        </h1>
        <div className="mt-12 md:flex">
          <CrearProducto />
          <ProductosList />
        </div>
      </div>
    </>
  );
}

export default App;
