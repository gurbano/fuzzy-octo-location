 Newteam.prototype.bindResize = function(renderer, camera, controls) {
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
     self.renderer.setSize(window.innerWidth, window.innerHeight);
     self.renderer.setClearColorHex(CLEAR_HEX_COLOR);

     // add it to the target element
     self.mapDiv = document.getElementById("globe");
     self.mapDiv.appendChild(self.renderer.domElement);

     // setup a camera that points to the center
     self.camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
     self.camera.position.set(POS_X, POS_Y, POS_Z);
     self.camera.lookAt(new THREE.Vector3(0, 0, 0));

     self.controls = new THREE.TrackballControls(self.camera);
     self.controls.rotateSpeed = 1.0;
     self.controls.zoomSpeed = 1.2;
     self.controls.panSpeed = 0.8;

     self.controls.noZoom = false;
     self.controls.noPan = false;

     self.controls.staticMoving = false;
     self.controls.dynamicDampingFactor = 0.3;

     self.controls.minDistance = 1200;
     self.controls.maxDistance = 4000;

     self.controls.keys = [65, 83, 68];

     self.controls.addEventListener('change', function() {
         self.render();
     });

     // create a basic scene and add the camera
     self.scene = new THREE.Scene();
     self.scene.collision = [];
     self.scene.add(self.camera);
     //self.axes = new THREE.AxisHelper( );
     //self.scene.add( self.axes );
     self.bindResize(self.renderer, self.camera, self.controls);
 };

 var x = new THREE.Vector3(.5, 0, 0);
 //var theta = 0;
 //var radius = POS_Z;
 Newteam.prototype.updateCamera = function(first_argument) {
     var self = this;
     // theta += 0.1;
     // var camera = self.camera;
     //camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
     //camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
     //camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
     //camera.lookAt(self.scene.position);
 };
