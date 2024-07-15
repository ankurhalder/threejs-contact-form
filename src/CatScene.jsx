// CatScene.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const CatScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create cat parts
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffccaa });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    scene.add(body);

    const headGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffccaa });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.2;
    scene.add(head);

    const earGeometry = new THREE.CylinderGeometry(0.1, 0.3, 0.5, 32);
    const earMaterial = new THREE.MeshStandardMaterial({ color: 0xffccaa });
    const ear1 = new THREE.Mesh(earGeometry, earMaterial);
    ear1.position.set(0.3, 1.7, 0.3);
    ear1.rotation.z = -Math.PI / 4;
    scene.add(ear1);

    const ear2 = new THREE.Mesh(earGeometry, earMaterial);
    ear2.position.set(-0.3, 1.7, 0.3);
    ear2.rotation.z = Math.PI / 4;
    scene.add(ear2);

    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(0.2, 1.4, 0.8);
    scene.add(eye1);

    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(-0.2, 1.4, 0.8);
    scene.add(eye2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default CatScene;
