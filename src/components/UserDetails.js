import React, { useState } from "react";
const UserDetails = ({ user }) => {
  const [nome] = useState(user.nome);
  const [senha] = useState(user.senha);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nome, senha);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <br />
          <label htmlFor="">Usuario: </label>
          <input
            value={nome}
            type="text"
            name=""
            id=""
            placeholder="Digite seu nome"
          />
          <br /> <br />
          <label htmlFor="">Senha: </label>
          <input
            value={senha}
            type="text"
            name=""
            id=""
            placeholder="Digite sua senha"
          />
          <br />
          <br />
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
