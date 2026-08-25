// lib/strapi.js
// Camada de acesso à API do Strapi.
// Como o formato da resposta muda entre Strapi v4 (data.attributes.*)
// e v5 (campos direto em data.*), normalizeProfessor() trata os dois casos
// automaticamente, então esse código funciona nas duas versões sem alteração.

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Resolve a URL de uma mídia do Strapi (campo de imagem/arquivo),
 * cobrindo o formato v4 (media.data.attributes.url) e v5 (media.url).
 */

export function getStrapiMedia(media) {

  if (!media) return null;

  let mediaTarget = media;

  if (Array.isArray(media)) {
    if (media.length === 0) return null;
    mediaTarget = media[0];
  }

  else if (Array.isArray(media?.data)) {
    if (media.data.length === 0) return null;
    mediaTarget = media.data[0];
  }

  const url = mediaTarget?.url ?? mediaTarget?.attributes?.url ?? mediaTarget?.data?.attributes?.url ?? null;

  if (!url) return null;

  return url.startsWith("/") ? `${STRAPI_URL}${url}` : url;
}

//########################################### NORMALIZAR ####################################################
//######################################################################################################

export function normalizeProfessor(item) {
  // No Strapi v5 os campos já vêm direto na raiz (item), na v4 vêm em item.attributes
  const attrs = item.attributes ?? item;

  return {
    id: item.id,
    nome: attrs.nome ?? "",
    telefone: attrs.telefone ?? "",
    lattes: attrs.lattes ?? null,
    site: attrs.site ?? null,
    email: attrs.email ?? null,
    linkedin: attrs.linkedin ?? null,
    foto: getStrapiMedia(attrs.foto), // Passa o array de foto para ser tratado
  };
}

export function normalizeSimples(item) {

  // No Strapi v5 os campos já vêm direto na raiz (item), na v4 vêm em item.attributes
  const attrs = item.attributes ?? item;

  return {
    titulo: attrs.titulo,
    conteudo: attrs.conteudo
  };
}

//########################################### FETCH ####################################################
//######################################################################################################

/**
 * Busca a lista de professores no Strapi.
 * populate=foto garante que a imagem venha junto na mesma resposta.
 */

export async function fetchProfessores() {

  const res = await fetch(
    `${STRAPI_URL}/api/professors?populate=foto&sort=nome:asc`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar professores (status ${res.status})`);
  }
  const json = await res.json();
  const lista = json.data ?? [];
  return lista.map(normalizeProfessor);
}

export async function fetchExtensao() {

  const res = await fetch(
    `${STRAPI_URL}/api/extensao`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchPesquisa() {

  const res = await fetch(
    `${STRAPI_URL}/api/pesquisa`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}


export async function fetchIC() {

  const res = await fetch(
    `${STRAPI_URL}/api/ic`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchLab() {

  const res = await fetch(
    `${STRAPI_URL}/api/laboratorio`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchPosdoc() {

  const res = await fetch(
    `${STRAPI_URL}/api/posdoc`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}

export async function fetchTeses() {

  const res = await fetch(
    `${STRAPI_URL}/api/tese`
  );

  if (!res.ok) {
    throw new Error(`Erro ao buscar conteudo (status ${res.status})`);
  }
  const json = await res.json();
  return normalizeSimples(json.data);
}


