import type { Schema, Struct } from '@strapi/strapi';

export interface PesquisaCamposPesquisa extends Struct.ComponentSchema {
  collectionName: 'components_pesquisa_campos_pesquisas';
  info: {
    displayName: 'campos_pesquisa';
  };
  attributes: {
    conteudo: Schema.Attribute.Text;
    titulo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'pesquisa.campos-pesquisa': PesquisaCamposPesquisa;
    }
  }
}
