import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Home = () => {
  // Dos variables de estado, una por si hay errores y otra para todos los registros del fetch
  const [fetchError, setFetchError] = useState("");
  const [smoothies, setSmoothies] = useState([]);

  // usamos useEffect para invocar una vez todos los registros
  useEffect(() => {
    const fetchSmoothies = async () => {
      // Esto lo que hace es renombrar el objeto data -> smoothies. Estos métodos los podemos encontrar en la documentación de Supabase
      // https://oscarm.tinytake.com/msc/ODM1MjAwOV8yMTYxOTg3Ng
      let { data: smoothies, error } = await supabase
        .from("smoothies")
        .select("*");

      if (error) {
        // Mostramos el error que nos devuelve base de datos
        setFetchError(error.message);
      } else {
        // Cargamos todos los smoothies!
        setSmoothies(smoothies);
      }
    };
    fetchSmoothies();
  }, []);

  console.log(supabase);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      <h2>Home</h2>
      <div>
        {smoothies.map((s) => (
          <p>{s.title}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
