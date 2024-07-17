/* eslint-disable react/prop-types */
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import "./App.css";

const World = () => {
  const parent = React.useRef(null);
  const elements = React.useRef({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    ),
    renderer: new THREE.WebGLRenderer({ antialias: true, alpha: true }),
    controls: null,
  });

  React.useEffect(() => {
    let { scene, camera, renderer, controls } = elements.current;

    //initial
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.innerWidth / window.innerHeight);
    parent.current.append(renderer.domElement);
    camera.position.set(0, 0, 500);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    //add control
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.minDistance = 700;
    controls.maxDistance = 700;
    controls.maxPolarAngle = Math.PI / 2;

    //create geo
    var geometry = new THREE.DodecahedronGeometry(3, 0);
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    //add to scene with group
    var group = new THREE.Group();
    for (var i = 0; i < 50; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 1000 - 500;
      mesh.position.y = Math.random() * 600 - 300;
      mesh.position.z = Math.random() * 1000 - 200;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
    }
    scene.add(group);

    //light
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    var light1 = new THREE.DirectionalLight(0x141414);
    light1.position.set(-1, -1, -1);
    scene.add(light1);
    var light2 = new THREE.AmbientLight(0x141414, 0.3);
    scene.add(light2);

    renderer.render(scene, camera);
    var animate = function () {
      group.rotation.x += 0.0002;
      group.rotation.y += 0.0002;
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);
    };
    animate();

    const handlePointerMove = ({ clientX, clientY }) => {
      const centerPoint = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const z = (clientX - centerPoint.x) / 900;
      const x = (clientY - centerPoint.y) / 900;
      gsap.to(group.rotation, {
        x: -x,
        y: -z,
        duration: 1,
        ease: "power2.out",
        onUpdate: renderer.render(scene, camera),
      });
    };

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    const handleDeviceOrientation = ({
      acceleration,
      accelerationIncludingGravity,
    }) => {
      const { x, y } = accelerationIncludingGravity || acceleration;
      gsap.to(group.rotation, {
        x: Math.floor(-y) / 3,
        y: Math.floor(-x) / 3,
        duration: 1,
        ease: "power2.out",
        onUpdate: renderer.render(scene, camera),
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("devicemotion", handleDeviceOrientation, true);
  }, []);

  return <div className="world" ref={parent} />;
};

const O3D = ({ theme }) => {
  const parent = React.useRef(null);
  const lastTheme = React.useRef(theme);
  const elements = React.useRef({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerWidth,
      1,
      10000
    ),
    renderer: new THREE.WebGLRenderer({ antialias: true, alpha: true }),
    mesh: null,
  });

  React.useEffect(() => {
    const colors = {
      dark: {
        meshColor: 0xffffff,
      },
      light: {
        meshColor: 0x141414,
      },
    }[theme];
    let { scene, camera, renderer, mesh } = elements.current;

    if (lastTheme.current !== theme) {
      mesh.material.setValues({
        color: colors.meshColor,
      });
      renderer.render(scene, camera);
      lastTheme.current = theme;
      return;
    }

    //initial
    renderer.setSize(window.innerWidth, window.innerWidth);
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.innerWidth / window.innerWidth);
    parent.current.append(renderer.domElement);
    camera.position.set(0, 0, 1000);

    //create mesh
    let geometry = new THREE.DodecahedronGeometry(350, 0);
    let material = new THREE.MeshLambertMaterial({
      color: colors.meshColor,
    });
    mesh = new THREE.Mesh(geometry, material);
    elements.current.mesh = mesh;
    scene.add(mesh);

    //light
    let light = new THREE.AmbientLight(0xfffffa, 0.5);
    scene.add(light);
    let light1 = new THREE.DirectionalLight(0xfffffa, 3);
    scene.add(light1);
    light1.position.set(400, 200, 0);

    renderer.render(scene, camera);
    const animate = function () {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handlePointerMove = ({ clientX, clientY }) => {
      const centerPoint = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const z = (clientX - centerPoint.x) / 800;
      const x = (clientY - centerPoint.y) / 800;
      gsap.to(mesh.rotation, {
        x: -x,
        z: -z,
        y: x,
        duration: 1,
        ease: "power1.out",
        onUpdate: renderer.render(scene, camera),
      });
    };

    const handleDeviceOrientation = ({
      acceleration,
      accelerationIncludingGravity,
    }) => {
      const { x, y } = accelerationIncludingGravity || acceleration;
      gsap.to(mesh.rotation, {
        x: Math.floor(-y) / 3,
        y: Math.floor(-x) / 3,
        duration: 1,
        ease: "power1.out",
        onUpdate: renderer.render(scene, camera),
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("devicemotion", handleDeviceOrientation, true);
  }, [theme]);

  return <div className="canvasContainer" ref={parent} />;
};

const App = () => {
  const [theme, setTheme] = React.useState("light");

  return (
    <div className={`wrapper -${theme}`}>
      <div className="name">
        M<O3D theme={theme} />
        VE
      </div>
      <World />
      <p
        className="changeTheme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Change Theme
      </p>
      <a
        href="https://github.com/HosseinShabani"
        target="_blank"
        className="social"
      >
        Github
      </a>
    </div>
  );
};

export default App;
