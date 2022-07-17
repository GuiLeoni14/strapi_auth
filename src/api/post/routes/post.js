'use strict';

/**
 * post router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// adicionando os policies que necessitam de autenticação para manipular os dados
module.exports = createCoreRouter('api::post.post', {
  config: {
    create: {
      policies: ["local-policy", "global::is-logged-in"]
    },
    find: {
      policies: ["local-policy", "global::is-logged-in"]
    },
    findOne: {
      policies: ["local-policy", "global::is-logged-in"]
    },
    update: {
      policies: ["local-policy", "global::is-logged-in"]
    },
    delete: {
      policies: ["local-policy", "global::is-logged-in"]
    },
  },
});

