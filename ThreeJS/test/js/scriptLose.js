 "use strict";
 // Globale variabele
    let mesh, scene, camera, renderer, loader, geometry, textMaterial;

    createScene();
    createFont();
    animate();

    //Het aanmaken van camera, scene en renderer
    function createScene() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
      document.body.appendChild(renderer.domElement);
    }

    //Het aanmaken van text en op de scene zetten
    function createFont() {
      loader = new THREE.FontLoader();

      loader.load("fonts/helvetiker_bold.typeface.json", function (font) {
        geometry = new THREE.TextGeometry("You suck!", {
          font: font,
          size: 70,
          height: 3,
          curveSegments: 10,
          bevelEnabled: true,
          bevelThickness: 8,
          bevelSize: 10,
          bevelOffset: 0,
          bevelSegments: 4
        });

        textMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          specular: 0xf0b0b
        });

        mesh = new THREE.Mesh(geometry, textMaterial);
        scene.add(mesh);
      });
      camera.position.z = 5;
    }

    // Render de scene
    function animate() {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

      renderer.render(scene, camera);
    };