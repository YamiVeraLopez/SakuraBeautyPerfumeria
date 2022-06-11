import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit() {
    // autenticamos al usuario
    navigate("/") // lo redireccionamos
  }

  return <form onSubmit={handleSubmit}>...</form>
}