import { useEffect, useState } from "react";

interface producto {
  id: number;
  nombre: string;
  descripcion: string;
}

export default function ProductosList() {
  const [productos, setProductos] = useState<producto[]>([]);

  //Consulta al servidor
  //Esta es la consulta que se le hace al servidor para poder tener visualizacion de los productos en la base de daos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:5000/productos");
        const data: producto[] = await response.json(); // ✅ Se tipa la respuesta
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center mt-7">
        Lista de Productos
      </h2>

      <div className="max-h-[600px] h-170 overflow-y-auto rounded-lg p-3 mt-1 mx-5 my-10 px-5 py-10">
        {/*Muestra los productos de la consulta*/}
        {productos.length === 0 ? (
          <p className="text-gray-500">No hay productos disponibles.</p>
        ) : (
          <ul>
            {productos.map((producto) => (
              <li key={producto.id} className="mb-4 p-3 bg-gray-100 rounded ">
                <p className="font-bold text-gray-800">{producto.nombre}</p>
                <p className="text-gray-600">{producto.descripcion}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
