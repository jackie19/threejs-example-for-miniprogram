
import { FBXLoader as getFBXLoader } from '../../jsm/loaders/FBXLoader.js';
import { OrbitControls } from '../../jsm/controls/OrbitControls';

let cameraPosition = {
  x: 150,
  y: 300,
  z: 350,
}

export default function (canvas, THREE) {
  let window = THREE.global;

  let camera, scene, renderer, controls;

  let object;
  init()
  animate()
  function init() {
    
    //renderer
    {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //camera
    {
      camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    }
    //controls
    {
      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 5, 0);
      controls.update();
    }

    // scene & light
    {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff)

      // let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      // scene.add(ambientLight);
      // let pointLight = new THREE.PointLight(0xffffff, 0.8);
      // camera.add(pointLight);
      // scene.add(camera);

      let light = new THREE.HemisphereLight(0xffffff, 0x444444)
      light.position.set(0, 200, 0)
      scene.add(light)
      light = new THREE.DirectionalLight(0xffffff)
      light.position.set(0, 200, 100)
      light.castShadow = true
      light.shadow.camera.top = 180
      light.shadow.camera.bottom = -100
      light.shadow.camera.left = -120
      light.shadow.camera.right = 120
      light = new THREE.DirectionalLight(0xffffff)
      scene.add(light)
      light = new THREE.AmbientLight(0x222222)
      scene.add(light)
    }

    // manager
    function loadModel() {
      object.position.y = - 95;
      scene.add(object);
    }

    let manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };
 
    let loader =  new getFBXLoader();
    loader.load('https://threejs.org/examples/models/fbx/Samba%20Dancing.fbx', function (obj) {
        object = obj;
        object.position.y = - 95;
        scene.add(object)
        console.log(object, '====')
    });
  }

  function animate() {
    canvas.requestAnimationFrame(animate);
    render();
  }

  function render() {
    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);
  }
}