import buildLess from '@youyo-ui/builds/buildLess';

async function iconBuild() {
  console.log('icon build');
}

(() => {
  buildLess('components');
  iconBuild();
})();
