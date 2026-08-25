
"use client";

import { useEffect, useState } from "react";
import { fetchLab } from "@/lib/strapi";

export default function ExtensaoPage() {

  const [lab, setConteudo] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetchLab()
      .then((dados) => {
        if (ativo) setConteudo(dados);
      })
      .catch((err) => {
        if (ativo) setErro(err.message);
      })

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <main>
      <section className="container extensao">
        <h1>{lab.titulo}</h1>

        {erro && (
          <p className="prof-status prof-status--erro">
            Não foi possível carregar a página: {erro}
          </p>
        )}

        {!erro && (
          <p>
            {lab.conteudo}
          </p>

        )}
      </section>
    </main>
  );
}

