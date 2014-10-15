define(['t3'], function (t3) {

  t3.themes.sandyStone = {
    clearColor: 0xE6E2AF,
    fogColor: 0xE6E2AF,
    groundColor: 0xA7A37E
  };

  return t3.run({
    id: 'canvas',
    theme: 'sandyStone',
    init: function () {
      var geometry = new THREE.BoxGeometry(20, 20, 20);
      var material = new THREE.MeshNormalMaterial();
      this.cube = new THREE.Mesh(geometry, material);
      this.cube.position.set(100, 100, 100);
      this.activeScene
        .add(this.cube);
    },
    update: function (delta) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }
  });
});