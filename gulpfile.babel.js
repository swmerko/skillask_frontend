// generated on 2016-05-14 using generator-outlinejs 1.3.20
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import browserify from 'browserify';

import OutlineJsTasks from 'outlinejs/lib/utils/build/tasks';


class GulpTasks extends OutlineJsTasks {
  getBrowserify(debug = false, forNode = false, watch = false, files = [this.projectJsEntry]) {
    var b = super.getBrowserify(debug, forNode, watch, files);
    if (forNode) {
      b = b.exclude('jquery');
    }
    return b;
  }
}

const ojsTasks = new GulpTasks(gulp, browserify, eslint);
ojsTasks.load();

gulp.task('default', ['ojs:clean'], () => {
  gulp.start('ojs:build');
});
