'use strict';

/**
 * post router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::post.post', {
  config: {
    create: {
      policies: ["local-policy", "global::is-logged-in"]
    },
    find: {
      policies: ["local-policy", "global::is-logged-in"]
    },
  },
});

