// generated on 2016-03-05 using generator-outlinejs 1.2.9
import gulp from 'gulp';
import OutlineJsTasks from 'outlinejs/lib/utils/build/tasks';
import browserify from 'browserify';
import eslint from 'gulp-eslint';

const ojsTasks = new OutlineJsTasks(gulp, browserify, eslint);
ojsTasks.load();

gulp.task('default', ['ojs:clean'], () => {
  gulp.start('ojs:build');
});

