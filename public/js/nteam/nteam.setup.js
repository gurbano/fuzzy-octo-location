 Newteam.prototype.bindResize = function(renderer, camera,controls) {
     var callback = function() {
         renderer.setSize(window.innerWidth, window.innerHeight);
         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         controls.handleResize();

     };
     window.addEventListener('resize', callback, false);
     return {
         /**
          * Stop watching window resize
          */
         stop: function() {
             window.removeEventListener('resize', callback);
         }
     };
 };


 Newteam.prototype.setup = function(_callback) {
     var self = this;
     self.renderer = new THREE.WebGLRenderer();
     self.renderer.setSize(WIDTH, HEIGHT);
     self.renderer.setClearColorHex(CLEAR_HEX_COLOR);

     // add it to the target element
     self.mapDiv = document.getElementById("globe");
     self.mapDiv.appendChild(self.renderer.domElement);

     // setup a camera that points to the center
     self.camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
     self.camera.position.set(POS_X, POS_Y, POS_Z);
     self.camera.lookAt(new THREE.Vector3(0, 0, 0));

     self.controls = new THREE.TrackballControls(self.camera);
     self.controls.addEventListener( 'change', self.render );

     // create a basic scene and add the camera
     self.scene = new THREE.Scene();
     self.scene.add(self.camera);
     //self.axes = new THREE.AxisHelper( );
     //self.scene.add( self.axes );
     self.bindResize(self.renderer, self.camera, self.controls);
 };

 var x = new THREE.Vector3(.5, 0, 0);
 Newteam.prototype.updateCamera = function(first_argument) {
     var self = this;
     //self.sp.rotateAroundWorldAxis(x,.01);

 };
