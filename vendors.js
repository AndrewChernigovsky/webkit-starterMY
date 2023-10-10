import concatCSS from "gulp-concat-css";
import concat from "gulp-concat";
import gulp from "gulp";
import rename from "gulp-rename";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import uglifyjs from "gulp-uglify";

const pathsCSS = {
	swiper: "./node_modules/swiper/swiper-bundle.min.css",
	// swiper1: "./node_modules/swiper/swiper.css",
};

const pathsJS = {
	swiper: "./node_modules/swiper/swiper-bundle.min.js",
};

function arr(a) {
	let arr = [];

	if (a === "css") {
		for (let key in pathsCSS) {
			arr.push(pathsCSS[key]);
		}
	}

	if (a === "js") {
		for (let key in pathsJS) {
			arr.push(pathsJS[key]);
		}
	}

	return arr;
}

function vendorsCSS() {
	return gulp
		.src(arr("css"))
		.pipe(concatCSS("vendors.css"))
		.pipe(postcss([autoprefixer(), csso()]))
		.pipe(rename("vendors.min.css"))
		.pipe(gulp.dest("./build/css"));
}

function vendorsJS() {
	return gulp
		.src(arr("js"))
		.pipe(concat("vendors.js"))
		.pipe(uglifyjs())
		.pipe(rename("vendors.min.js"))
		.pipe(gulp.dest("./build/js"));
}

async function vendors() {
	let a = await( vendorsCSS(), vendorsJS())
	// let b = await( vendorsJS() );
}

export default vendors;
