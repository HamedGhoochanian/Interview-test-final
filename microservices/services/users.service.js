const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");

module.exports = {
	name: "users",
	mixins: [DbService],
	adapter: new MongoDBAdapter(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,}, "baad"),
	collection: "users",
	settings: {
		fields: ["_id", "name"],
	},
	actions: {
		async updateUser(ctx) {
			return await this.adapter.updateById(ctx.params.id, ctx.params.update);
		}
	}
};
