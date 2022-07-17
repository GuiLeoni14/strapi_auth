'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({strapi}) => ({
    // vincular o usuário na criação do post
    async create(ctx) {
        const { id } = ctx.state.user;
        const data = ctx.request.body;
        const post = { ...data, user: id };
        // Register the order in the database
        const entity = await strapi.service('api::post.post').create({
            data:{...post},
        });
        console.log(post);
        console.log(entity);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      },
      // permitir que somente busque posts do usuário que solicitou(através do Bearer Token)
      async find(ctx) {
        let entity;
        const { id } = ctx.state.user;
        const query = {...ctx.query}

        if(ctx.query._q){
          entity = await strapi.service('api::post.post').search(id,query);
        }else{
          entity = await strapi.service('api::post.post').findOne(id,query);
        }
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);

      },
      // async findOne(ctx) {
      //   const { id } = ctx.params;
      //   console.log(ctx.state.user.id, id)
      //   const query = {
      //     ...ctx.query,
      //     where: {
      //         id,
      //         user: {
      //           id: ctx.state.user.id
      //         },
      //     }
      //   }

      //   const entity = await strapi.db.query('api::post.post').findOne(query);
      //   console.log(entity);
      //   if(id == entity.id) {
      //     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      //     return this.transformResponse(sanitizedEntity);
      //   }

      // },
}));
