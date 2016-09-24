var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var tsify = require("tsify");
var ts = require("gulp-typescript");
var config = {
    client: {
        dir: __dirname + "/src/ts",
        main: __dirname + "/src/ts/pluginmain.ts",
        output: "bundle.js",
        outputDir: __dirname + "/build/public/js"
    },
    html: {
        src: ["src/**/*.html"],
        outputDir: "build/public"
    }
};
gulp.task("build:client", function() {
    var bundler = browserify({basedir: config.client.dir})
        .add(config.client.main)
        .plugin(tsify);
    return bundler.bundle()
        .pipe(source(config.client.output))
        .pipe(gulp.dest(config.client.outputDir));
});
gulp.task("build:copy:html", function() {
    return gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.outputDir));
});
gulp.task("watch", function() {
    gulp.watch(config.html.src, ["build:copy:html"]);
    gulp.watch(config.client.dir + "/**/*.ts", ["build:client"]);
});
gulp.task("default", ["build:client", "build:copy:html"])
gulp.task("build", ["build:client", "build:copy:html"])