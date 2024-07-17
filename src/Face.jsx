import { useRef, useEffect } from "react";
import * as THREE from "three";

const Face = () => {
  const faceRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    faceRef.current.appendChild(renderer.domElement);

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffe0bd });
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const retinaMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff });

    // Head geometry and mesh
    const headGeometry = new THREE.BoxGeometry(300, 350, 280);
    const headMesh = new THREE.Mesh(headGeometry, skinMaterial);
    headMesh.position.set(0, 160, 400);
    scene.add(headMesh);

    // Left eye glass
    const ovalShape = new THREE.Shape();
    ovalShape.moveTo(0, 0);
    ovalShape.absellipse(0, 0, 15, 25, 0, Math.PI * 2, false);
    const glassLeftGeometry = new THREE.ExtrudeGeometry(ovalShape, {
      depth: 10,
      bevelEnabled: false,
    });
    const glassLeftMesh = new THREE.Mesh(glassLeftGeometry, eyeMaterial);
    glassLeftMesh.position.set(-15, 45, 160);
    headMesh.add(glassLeftMesh);

    // Right eye glass
    const glassRightGeometry = new THREE.ExtrudeGeometry(ovalShape, {
      depth: 10,
      bevelEnabled: false,
    });
    const glassRightMesh = new THREE.Mesh(glassRightGeometry, eyeMaterial);
    glassRightMesh.position.set(135, 45, 160);
    headMesh.add(glassRightMesh);

    // Center glass
    const glassCenterGeometry = new THREE.BoxGeometry(40, 10, 10);
    const glassCenterMesh = new THREE.Mesh(glassCenterGeometry, eyeMaterial);
    glassCenterMesh.position.set(0, 5, 155);
    headMesh.add(glassCenterMesh);

    // Retina geometry
    const retinaGeometry = new THREE.SphereGeometry(12, 32, 32);

    // Left retina
    const retinaLeftMesh = new THREE.Mesh(retinaGeometry, retinaMaterial);
    retinaLeftMesh.position.set(-80, 5, 168);
    headMesh.add(retinaLeftMesh);

    // Right retina
    const retinaRightMesh = new THREE.Mesh(retinaGeometry, retinaMaterial);
    retinaRightMesh.position.set(80, 5, 168);
    headMesh.add(retinaRightMesh);

    // Position the camera
    camera.position.z = 1000;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(200, 200, 300);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      headMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      renderer.dispose();
      headGeometry.dispose();
      skinMaterial.dispose();
      glassLeftGeometry.dispose();
      glassRightGeometry.dispose();
      glassCenterGeometry.dispose();
      eyeMaterial.dispose();
      retinaGeometry.dispose();
      retinaMaterial.dispose();
    };
  }, []);

  return <div ref={faceRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Face;
