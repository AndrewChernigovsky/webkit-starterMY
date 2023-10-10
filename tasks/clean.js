import fs from "fs";
import del from "del";

const buildFolder = "./build";

async function clean() {
	try {
		if (!fs.existsSync(buildFolder)) {
			fs.mkdirSync(buildFolder);
		}
	} catch (err) {
		console.error(err);
	}
	fs.access(`${buildFolder}`, (err) => {
		if (err) throw err;
		return del(
			[
				`${buildFolder}/**`,
				`!${buildFolder}/img/**`,
				`!${buildFolder}/fonts/**`,
				`!${buildFolder}/js/**`,
				`!${buildFolder}/css/**`,
			],
			{ force: true }
		);
	});
}

export default clean;
