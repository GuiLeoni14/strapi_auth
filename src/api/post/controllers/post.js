'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({strapi}) => ({
    async create(ctx) {
        const { id } = ctx.state.user;
        const {title, content, slug, excerpt } = ctx.request.body.data;
        const post = { title, content, slug, excerpt, user: id };
        // Register the order in the database
        const entity = await strapi.service('api::post.post').create({
            data:{...post},
        });

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }
}));
