var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight-5 );
var controls = new THREE.OrbitControls( camera );
document.body.appendChild( renderer.domElement );													//add the renderer as a child to <body>
renderer.setClearColor( 0x000000, 0);
var texture, visible;
camera.position.z = -15;																			//position the cameraZ
camera.position.x = 3;																				//position the cameraX
camera.rotation.y = 170*Math.PI / 180;																//position the camera RotY
camera.rotation.x = 20*Math.PI / 180;																//position the camera RotX
camera.position.y = 4.5;

controls.update();

var loader1 = new THREE.GLTFLoader();																//create new GLTF Loader and load the
loader1.load('mesh/scene.glb', function (bck) {														//room but do not add it to the scene now
	yourObj = bck.scene;
	yourObj.rotation.y = 130*Math.PI / 180;
	yourObj.position.y = -2;
	yourObj.position.z = -1;
	yourObj.castShadow = true;
	yourObj.receiveShadow = true;
	yourObj.name = "room";
});

function event22() {																				//I have no clue why I named this function
	var cla = document.querySelector('#addroom');													//event 22. Bad practice I know
	cla.addEventListener("click", room);
	var clb = document.querySelector('#clearmesh');
	clb.addEventListener("click", resetMesh, false);
	var clc = document.querySelector('#desk_c');
	clc.addEventListener("click", loadDeskC, false);
	var clh = document.querySelector('#desk_d');
	clh.addEventListener("click", loadDeskD, false);
	var cld = document.querySelector('#desk_b');
	cld.addEventListener("click", loadDeskB, false);
	var cle = document.querySelector('#white');
	cle.addEventListener("click", loadTex2, false);
	var cld = document.querySelector('#oak');
	cld.addEventListener("click", loadTex0, false);
	var clf = document.querySelector('#ash');
	clf.addEventListener("click", loadTex1, false);
	var clg = document.querySelector('#wood');
	clg.addEventListener("click", loadTex3, false);
}

const loadDeskB = () => {
	if(typeof myObj != "undefined") scene.remove(myObj);											//if a desk already exists, remove it
	
	var loader = new THREE.GLTFLoader();
	loader.load('mesh/desk_b.glb', function (gltf, materials){
		myObj = gltf.scene;
		myObj.position.y = -2;
		myObj.position.x = 4;
		myObj.position.z = -1;
		myObj.rotation.y = 130*Math.PI / 180;
		myObj.castShadow = true;
		myObj.receiveShadow = true;
   		scene.add(myObj, materials);
	}, undefined, function (error){
		console.error(error);
	});
}
	
const loadDeskC = () => {
	if(typeof myObj != "undefined") scene.remove(myObj);

	loader = new THREE.GLTFLoader();
	loader.load('mesh/desk_c.glb', function(gltf, materials) {
		myObj = gltf.scene;
		myObj.position.y = -2;
		myObj.position.x = 4;
		myObj.position.z = -1;
		myObj.rotation.y = 130*Math.PI / 180;
		myObj.castShadow = true;
		myObj.receiveShadow = true;
   		scene.add(myObj, materials);
	}, undefined, function (error){
		console.error(error);
	});	
}

const loadDeskD = () => {
	if(typeof myObj != "undefined") scene.remove(myObj);

	loader = new THREE.GLTFLoader();
	loader.load('mesh/desk_d.glb', function(gltf, materials) {
		myObj = gltf.scene;
		myObj.position.y = -2;
		myObj.position.x = 4;
		myObj.position.z = -1;
		myObj.rotation.y = 130*Math.PI / 180;
		myObj.castShadow = true;
		myObj.receiveShadow = true;
   		scene.add(myObj, materials);
	}, undefined, function (error){
		console.error(error);
	});	
}

const loadTex2 = () => {
	if(typeof myObj != "undefined") {
		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load( 'img/txwt3.jpg' );
		texture.flipY = false;
		myObj.traverse ( ( o ) => {
			if ( o.isMesh ) {
				o.material.map = texture;
			}
    	});
	}
}

const loadTex0 = () => {
	if(typeof myObj != "undefined") {
		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load( 'img/wood-68.jpg' );
		texture.flipY = false;
		myObj.traverse ( ( o ) => {
			if ( o.isMesh ) {
				o.material.map = texture;
			}
    	});
	}
}

const loadTex1 = () => {
	if(typeof myObj != "undefined") {
		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load( 'img/twxt2.jpg' );
		texture.flipY = false;
		myObj.traverse ( ( o ) => {
			if ( o.isMesh ) {
				o.material.map = texture;
			}
    	});
	}
}

const loadTex3 = () => {
	if(typeof myObj != "undefined") {
		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load( 'img/twxt1.png' );
		texture.flipY = false;
		myObj.traverse ( ( o ) => {
			if ( o.isMesh ) {
				o.material.map = texture;
			}
    	});
	}
}

const resetMesh = () => {
	scene.remove(myObj);
	scene.remove(yourObj);
}

const room =() => {
		if(visible) {
			scene.remove(yourObj);
			visible = false;
		}
		else {
			scene.add(yourObj);
			visible = true;
		}
}

scene.add( new THREE.AmbientLight( 0x666666 ) );
var light1 = new THREE.SpotLight( 0x666666, 1, 1000);
light1.position.set(1, 40, 0);
light1.position.multiplyScalar( 1 );
light1.castShadow = true;
light1.angle = Math.PI/6;
light1.shadow.mapSize.width = 1024;
light1.shadow.mapSize.height = 1024;
var d1 = 50;
light1.shadow.camera.left = - d1;
light1.shadow.camera.right = d1;
light1.shadow.camera.top = d1;
light1.shadow.camera.bottom = - d1;
light1.shadow.camera.far = 1000;
scene.add( light1 );

var light2 = new THREE.SpotLight( 0x666666, 1, 1000);
light2.position.set(3, 7, -30);
light2.position.multiplyScalar( 1 );
light2.castShadow = true;
light2.angle = Math.PI/4;
light2.shadow.mapSize.width = 1024;
light2.shadow.mapSize.height = 1024;
light2.shadow.camera.left = - d1;
light2.shadow.camera.right = d1;
light2.shadow.camera.top = d1;
light2.shadow.camera.bottom = - d1;
light2.shadow.camera.far = 1000;
scene.add( light2 );

var light3 = new THREE.SpotLight( 0xffffff, 1, 1000);
light3.position.set(0, 15, -10);
light3.position.multiplyScalar( 1 );
light3.castShadow = true;
light3.angle = Math.PI/4;
light3.shadow.mapSize.width = 1024;
light3.shadow.mapSize.height = 1024;
light3.shadow.camera.left = - d1;
light3.shadow.camera.right = d1;
light3.shadow.camera.top = d1;
light3.shadow.camera.bottom = - d1;
light3.shadow.camera.far = 1000;
scene.add( light3 );

//var spotLightHelper = new THREE.SpotLightHelper( light1 );
//scene.add( spotLightHelper);
				
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	event22();
}

animate();
	