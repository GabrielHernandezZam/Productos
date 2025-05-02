import { useForm } from "react-hook-form";
import Error from "../Productos/Error";

interface FormData {
  nombre: string;
  descripcion: string;
  id_usuario: number; // Cambiado de null a string
}

export default function CrearProducto() {
  // Nos permite registrar un input o select y aplicar las reglas de validación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Función para crear el producto
  const crearProducto = async (data: FormData) => {
    try {
      // Enviar datos a la API usando fetch
      const response = await fetch("http://localhost:5000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convertimos el objeto a JSON
      });

      const result = await response.json(); // Obtener la respuesta del servidor
      console.log(result); // Mostrar la respuesta del servidor (ejemplo de éxito)

      // Aquí podrías redirigir o mostrar un mensaje
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Crear Producto</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Productos y {""}
        <span className="text-indigo-600 font-bold">Administrarlos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(crearProducto)}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-sm uppercase font-bold">
            Producto
          </label>
          <input
            id="nombre"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Producto"
            {...register("nombre", {
              required: "El nombre del producto es obligatorio",
            })}
          />
          {errors.nombre && <Error>{errors.nombre?.message?.toString()}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="descripcion" className="text-sm uppercase font-bold">
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="w-full p-3  border border-gray-100"
            placeholder="Descripción del producto"
            {...register("descripcion", {
              required: "La descripción del producto es obligatoria",
            })}
          />
          {errors.descripcion && (
            <Error>{errors.descripcion?.message?.toString()}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="usuario" className="text-sm uppercase font-bold">
            Usuario
          </label>
          <input
            id="id_usuario"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="ID del usuario"
            {...register("id_usuario", {
              required: "El ID del usuario es obligatorio",
            })}
          />
          {errors.id_usuario && (
            <Error>{errors.id_usuario?.message?.toString()}</Error>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Crear Producto"
        />
      </form>
    </div>
  );
}
