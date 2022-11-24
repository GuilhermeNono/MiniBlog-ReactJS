import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from './Login.module.css'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login, error:authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
        email,
        password
    }

    const res = await login(user);

    console.log(res)
  };

  useEffect(() => {

    if(authError) {
        setError(authError)
    }

  }, [authError])

  return (
    <div className={styles.login}>
        <h1>Entre em sua conta</h1>
      <p>Entre em sua conta para usar os recursos do blog.</p>
      <form onSubmit={handleSubmit}>
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
        
        {!loading ? (<button className="btn">
          Entrar
        </button>) : (<button className="btn" disabled>
          Aguarde...
        </button>)}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login