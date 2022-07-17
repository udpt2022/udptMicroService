//https://github.com/moleculerjs/moleculer-web/blob/master/examples/file.service.js
const fs = require("fs");
const path = require("path");
const { NotFoundError } = require("../src/errors");
const mkdir = require("mkdirp").sync;
const mime = require("mime-types");

const uploadDir = path.join(__dirname, "__uploads");
mkdir(uploadDir);

module.exports = {
	name: "file",
	actions: {
		image: {
			handler(ctx) {
				ctx.meta.$responseType = "image/png";
				// Return as stream
				return fs.createReadStream(path.join(__dirname, "full", "assets", "images", "logo.png"));
			}
		},

		html: {
			handler(ctx) {
				ctx.meta.$responseType = "text/html";
				return Buffer.from(`
<html>
<body>
	<h1>Hello API Gateway!</h1>
	<img src="/api/file.image" />
</body>
</html>
				`);
			}
		},

		get: {
			rest: {
                method: "GET",
                path: "/:file"
            },
            params: {
                file: "string", //"uuid",
            },
			handler(ctx) {
				const filePath = path.join(uploadDir, ctx.params.file);
				if (!fs.existsSync(filePath))
					return new NotFoundError();

				ctx.meta.$responseType = mime.lookup(ctx.params.file);
				// Return as stream
				return fs.createReadStream(filePath);
			}
		},

		save: {
			rest: {
                method: "POST",
                path: "/"
            },
			handler(ctx) {
				this.logger.info("Received upload $params:", ctx.meta.$params);
				return new this.Promise((resolve, reject) => {
					//reject(new Error("Disk out of space"));
					const filePath = path.join(uploadDir, ctx.meta.filename || this.randomName());
					const f = fs.createWriteStream(filePath);
					f.on("close", () => {
						// File written successfully
						this.logger.info(`Uploaded file stored in '${filePath}'`);
						resolve({ filePath, meta: ctx.meta });
					});

					ctx.params.on("error", err => {
						this.logger.info("File error received", err.message);
						reject(err);

						// Destroy the local file
						f.destroy(err);
					});

					f.on("error", () => {
						// Remove the errored file.
						fs.unlinkSync(filePath);
					});

					ctx.params.pipe(f);
				});
			}
		}
	},
	methods: {
		randomName() {
			return "unnamed_" + Date.now() + ".png";
		}
	}
};