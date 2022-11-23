import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Register.module.css";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error:authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
        displayName,
        email,
        password
    }

    if(password !== confirmPassword) {
        setError("As senhas precisam ser iguais!")
        return
    }

    const res = await createUser(user);

    console.log(res)
  };

  useEffect(() => {

    if(authError) {
        setError(authError)
    }

  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuario e compartilhe suas historias.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input 
          type="text" 
          name="displayName" 
          placeholder="Nome do usuário"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
            />
        </label>
        <label>
          <span>E-mail</span>
          <input 
          type="email" 
          name="email" 
          placeholder="E-mail do usuário" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirmar Senha</span>
          <input
            type="password"
            name="password"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        
        {!loading ? (<button className="btn">
          Cadastrar
        </button>) : (<button className="btn" disabled>
          Aguarde...
        </button>)}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
