"use client";

import { useEffect, useState } from "react";
import { fetchTeses } from "@/lib/strapi";

export default function TesesPage() {

  const [teses, setConteudo] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    fetchTeses()
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
        <h1>{teses.titulo}</h1>

        {erro && (
          <p className="prof-status prof-status--erro">
            Não foi possível carregar a página: {erro}
          </p>
        )}

        {!erro && (
          <p>
            {teses.conteudo}
          </p>

        )}
      </section>
    </main>
  );
}

