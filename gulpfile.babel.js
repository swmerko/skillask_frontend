// generated on 2016-03-12 using generator-outlinejs 1.3.19
import gulp from 'gulp';
import OutlineJsTasks from 'outlinejs/lib/utils/build/tasks';
import browserify from 'browserify';
import eslint from 'gulp-eslint';

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

//TODO: remove when pot task is fixed for ES7
gulp.task('ojs:pot', (cb) => {
  console.log('Bypassed until pot task is fixed for ES7');
  cb();
});