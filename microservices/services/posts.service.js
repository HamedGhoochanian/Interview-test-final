const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");

module.exports = {
	name: "posts",
	mixins: [DbService],
	adapter: new MongoDBAdapter(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,}, "baad"),
	collection: "posts",
	settings: {
		fields: ["_id", "title", "content", "author", "dateCreated"],
	},
	actions: {
		async updatePost(ctx){
			return await this.adapter.updateById(ctx.params.id,  ctx.params.update);
		}
	}
};
