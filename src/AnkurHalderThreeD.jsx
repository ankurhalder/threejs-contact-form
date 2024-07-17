/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import * as THREE from "three";
import { Shape, ExtrudeGeometry, Mesh } from "three";

// Function to create an oval shape
function createOvalShape(width, height) {
  const shape = new Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x, y + height / 2);
  shape.ellipse(x + width / 2, y, width / 2, height / 2, 0, Math.PI * 2, false);
  return shape;
}
const AnkurHalderScene = () => {
  let camera, scene, renderer;
  let world, ankur;
  let hemiLight, dirLight, backLight, isUp;

  const container = {
    width: 0,
    height: 0,
  };

  const mouse = {
    x: {
      current: 0,
      previous: 0,
      calc: 0,
    },
    y: {
      current: 0,
      previous: 0,
      calc: 0,
    },
  };

  useEffect(() => {
    init();
    addLights();
    createAnkur();
    loop();

    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);
    document.addEventListener("touchmove", touchmove);
    document.addEventListener("touchend", touchend);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("touchmove", touchmove);
      document.removeEventListener("touchend", touchend);

      if (renderer) {
        renderer.domElement.remove();
        renderer.forceContextLoss();
        renderer.context = null;
        renderer.domElement = null;
        renderer = null;
      }
    };
  }, []);

  const init = () => {
    container.width = window.innerWidth;
    container.height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(
      65,
      container.width / container.height,
      1,
      2000
    );
    camera.position.z = 2000;
    camera.position.y = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    world = document.getElementById("mybody");
    if (world) {
      world.appendChild(renderer.domElement);
    }
  };

  const onWindowResize = () => {
    container.width = window.innerWidth;
    container.height = window.innerHeight;

    camera.aspect = container.width / container.height;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const mousemove = (e) => {
    mouse.x.current = e.clientX;
    mouse.y.current = e.clientY;
    mouse.x.calc = mouse.x.current - container.width / 2;
    mouse.y.calc = mouse.y.current - container.height / 2;
  };

  const touchmove = (e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      mouse.x.current = e.touches[0].pageX;
      mouse.y.current = e.touches[0].pageY;
      mouse.x.calc = mouse.x.current - container.width / 2;
      mouse.y.calc = mouse.y.current - container.height / 2;
    }
  };

  const touchend = (e) => {
    if (isUp) {
      isUp = false;
    } else {
      mousedown(e);
    }
  };

  const mouseup = () => {
    isUp = false;
  };

  const mousedown = () => {
    isUp = true;
  };

  const addLights = () => {
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);

    dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(200, 200, 200);
    dirLight.castShadow = true;
    dirLight.shadowDarkness = 0.1;

    backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-200, 200, 50);
    backLight.shadowDarkness = 0.1;
    backLight.castShadow = true;

    scene.add(hemiLight);
    scene.add(dirLight);
    scene.add(backLight);
  };

  const createAnkur = () => {
    ankur = new Ankur();
    scene.add(ankur.threegroup);
  };

  const loop = () => {
    renderer.render(scene, camera);
    if (ankur) ankur.update();
    requestAnimationFrame(loop);
  };
  const ovalShape = createOvalShape(120, 78);
  const extrudeSettings = {
    depth: 10,
    bevelEnabled: false,
  };
  class Ankur {
    constructor() {
      this.threegroup = new THREE.Group();

      this.skinMat = new THREE.MeshLambertMaterial({
        color: "#e0bea5",
        shading: THREE.FlatShading,
      });

      this.eyeMat = new THREE.MeshLambertMaterial({
        color: "white",
        shading: THREE.FlatShading,
      });
      this.retinaMat = new THREE.MeshLambertMaterial({
        color: "#333",
        shading: THREE.FlatShading,
      });
      this.bearMat = new THREE.MeshLambertMaterial({
        color: "#bb7344",
        shading: THREE.FlatShading,
      });

      const head = new THREE.BoxGeometry(300, 350, 280);
      this.head = new THREE.Mesh(head, this.skinMat);
      this.head.position.x = 0;
      this.head.position.y = 160;
      this.head.position.z = 400;

      // Create left glass
      const glassLeftGeometry = new ExtrudeGeometry(ovalShape, extrudeSettings);
      this.glassLeft = new Mesh(glassLeftGeometry, this.eyeMat);
      this.glassLeft.position.x = -15;
      this.glassLeft.position.y = 45;
      this.glassLeft.position.z = 160;
      this.head.add(this.glassLeft);

      // Create right glass
      const glassRightGeometry = new ExtrudeGeometry(
        ovalShape,
        extrudeSettings
      );
      this.glassRight = new Mesh(glassRightGeometry, this.eyeMat);
      this.glassRight.position.x = 135;
      this.glassRight.position.y = 45;
      this.glassRight.position.z = 160;
      this.head.add(this.glassRight);

      const glassu = new THREE.BoxGeometry(40, 10, 10);
      this.glassu = new THREE.Mesh(glassu, this.eyeMat);
      this.glassu.position.x = 0;
      this.glassu.position.y = 5;
      this.glassu.position.z = 155;
      this.head.add(this.glassu);

      const retina = new THREE.BoxGeometry(25, 25, 5);
      this.retinaLeft = new THREE.Mesh(retina, this.retinaMat);
      this.retinaLeft.position.x = -80;
      this.retinaLeft.position.y = 5;
      this.retinaLeft.position.z = 168;
      this.head.add(this.retinaLeft);

      this.retinaRight = new THREE.Mesh(retina, this.retinaMat);
      this.retinaRight.position.x = 80;
      this.retinaRight.position.y = 5;
      this.retinaRight.position.z = 168;
      this.head.add(this.retinaRight);

      const beard = new THREE.BoxGeometry(140, 130, 10);
      this.beard = new THREE.Mesh(beard, this.bearMat);
      this.beard.position.x = 0;
      this.beard.position.z = 160;
      this.beard.position.y = -140;
      this.head.add(this.beard);

      const mout = new THREE.BoxGeometry(90, 60, 50);
      this.mout = new THREE.Mesh(mout, this.skinMat);
      this.mout.position.x = 0;
      this.mout.position.z = 155;
      this.mout.position.y = -130;
      this.head.add(this.mout);

      const lip = new THREE.BoxGeometry(40, 20, 50);
      this.lip = new THREE.Mesh(lip, this.skinMat);
      this.lip.position.x = 0;
      this.lip.position.z = 162;
      this.lip.position.y = -120;
      this.head.add(this.lip);

      const hatTop = new THREE.BoxGeometry(320, 120, 290);
      this.hatTop = new THREE.Mesh(hatTop, this.skinMat);
      this.hatTop.position.x = 0;
      this.hatTop.position.z = 0;
      this.hatTop.position.y = 180;
      this.head.add(this.hatTop);

      const hatBottom = new THREE.BoxGeometry(400, 40, 380);
      this.hatBottom = new THREE.Mesh(hatBottom, this.skinMat);
      this.hatBottom.position.x = 0;
      this.hatBottom.position.z = 0;
      this.hatBottom.position.y = 100;
      this.head.add(this.hatBottom);

      const body = new THREE.BoxGeometry(300, 250, 600);
      this.body = new THREE.Mesh(body, this.skinMat);
      this.body.position.x = 0;
      this.body.position.y = -220;
      this.body.position.z = 100;
      this.threegroup.add(this.body);

      const arm = new THREE.BoxGeometry(50, 250, 100);
      this.armLeft = new THREE.Mesh(arm, this.skinMat);
      this.armLeft.position.x = -170;
      this.armLeft.position.y = 0;
      this.armLeft.position.z = 200;
      this.body.add(this.armLeft);

      this.armRight = new THREE.Mesh(arm, this.skinMat);
      this.armRight.position.x = 170;
      this.armRight.position.y = 0;
      this.armRight.position.z = 200;
      this.body.add(this.armRight);

      const hand = new THREE.BoxGeometry(50, 50, 50);
      this.handLeft = new THREE.Mesh(hand, this.skinMat);
      this.handLeft.position.x = -170;
      this.handLeft.position.y = -150;
      this.handLeft.position.z = 220;
      this.body.add(this.handLeft);

      this.handRight = new THREE.Mesh(hand, this.skinMat);
      this.handRight.position.x = 170;
      this.handRight.position.y = -150;
      this.handRight.position.z = 220;
      this.body.add(this.handRight);

      const zipper = new THREE.BoxGeometry(80, 250, 10);
      this.zipper = new THREE.Mesh(zipper, this.skinMat);
      this.zipper.position.x = 0;
      this.zipper.position.y = 0;
      this.zipper.position.z = 300;
      this.body.add(this.zipper);

      const legs = new THREE.BoxGeometry(200, 300, 300);
      this.legs = new THREE.Mesh(legs, this.skinMat);
      this.legs.position.x = 0;
      this.legs.position.y = -200;
      this.legs.position.z = 100;
      this.body.add(this.legs);

      const legsM = new THREE.BoxGeometry(10, 130, 5);
      this.legsM = new THREE.Mesh(legsM, this.skinMat);
      this.legsM.position.x = 0;
      this.legsM.position.y = -280;
      this.legsM.position.z = 248;
      this.body.add(this.legsM);

      const shoes = new THREE.BoxGeometry(200, 50, 400);
      this.shoes = new THREE.Mesh(shoes, this.skinMat);
      this.shoes.position.x = 0;
      this.shoes.position.y = -400;
      this.shoes.position.z = 100;
      this.body.add(this.shoes);

      this.head.scale.set(1, 1, 1);
      this.head.rotation.y = 0;
      this.head.rotation.x = 0;

      this.body.rotation.y = 0;
      this.body.rotation.x = 0;

      this.threegroup.add(this.head);
      this.threegroup.add(this.body);
    }

    update() {
      this.bodyRY = calc(mouse.x.calc, -400, 400, -Math.PI / 20, Math.PI / 20);
      this.bodyRX = calc(mouse.y.calc, -400, 400, -Math.PI / 90, Math.PI / 90);

      this.headRY = calc(mouse.x.calc, -200, 200, -Math.PI / 4, Math.PI / 4);
      this.headRX = calc(mouse.y.calc, -200, 200, -Math.PI / 4, Math.PI / 4);

      this.rotate(10);
    }

    rotate(speed) {
      if (isUp) {
        if (this.beard.scale.y < 2) {
          this.beard.scale.y += 0.02;
          this.beard.position.y -= 1.3;
          this.body.position.z -= 2;
        }

        this.body.material.color = new THREE.Color("#ffc107");
        this.legsM.material.color = new THREE.Color("#755b0b");
        this.zipper.material.color = new THREE.Color("#755b0b");
        this.shoes.material.color = new THREE.Color("#907637");

        this.zipper.scale.x = this.zipper.scale.y = 0.2;
        this.hatTop.scale.x = this.hatBottom.scale.x = 0;
        this.hatTop.scale.y = this.hatBottom.scale.y = 0;
        this.hatTop.scale.z = this.hatBottom.scale.z = 0;
        this.lip.scale.x = 0.5;

        this.retinaLeft.rotation.z += 0.1;
        this.retinaRight.rotation.z -= 0.1;
        this.handLeft.rotation.y += 0.1;
        this.handRight.rotation.y -= 0.1;
      } else {
        this.beard.position.set(0, -140, 160);
        this.beard.scale.y = 1;
        this.body.position.z = 100;

        this.body.material.color = new THREE.Color("#333");
        this.legsM.material.color = new THREE.Color("#222");
        this.zipper.material.color = new THREE.Color("white");
        this.shoes.material.color = new THREE.Color("#585858");

        this.zipper.scale.x = this.zipper.scale.y = 1;
        this.hatTop.scale.x = this.hatBottom.scale.x = 1;
        this.hatTop.scale.y = this.hatBottom.scale.y = 1;
        this.hatTop.scale.z = this.hatBottom.scale.z = 1;
        this.lip.scale.x = 1;

        this.retinaLeft.rotation.z = 0;
        this.retinaRight.rotation.z = 0;
        this.handLeft.rotation.y = 0;
        this.handRight.rotation.y = 0;
      }

      this.body.rotation.y += (this.bodyRY - this.body.rotation.y) / speed;
      this.body.rotation.x += (this.bodyRX - this.body.rotation.x) / speed;

      this.head.rotation.y += (this.headRY - this.head.rotation.y) / speed;
      this.head.rotation.x += (this.headRX - this.head.rotation.x) / speed;
    }
  }

  function calc(v, vmin, vmax, tmin, tmax) {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + pc * dt;
    return tv;
  }

  return <div id="mybody" style={{ width: "100%", height: "100vh" }} />;
};

export default AnkurHalderScene;
