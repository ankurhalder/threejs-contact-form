import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Cat = () => {
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const mouthRef = useRef();
  const noseRef = useRef();
  const earLeftRef = useRef();
  const earRightRef = useRef();
  const cursor = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  useEffect(() => {
    const handleMouseMove = (event) => {
      cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    raycaster.setFromCamera(cursor, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.at(10, intersectPoint);

    leftPupilRef.current.lookAt(intersectPoint);
    rightPupilRef.current.lookAt(intersectPoint);
  });

  return (
    <group>
      {/* Cat's Head */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Nose */}
      <mesh ref={noseRef} position={[0, 0.8, 1.1]}>
        <coneGeometry args={[0.05, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, 0.7, 0.9]}>
        <boxGeometry args={[0.2, 0.05, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Left Eye */}
      <group ref={leftEyeRef} position={[-0.3, 1.3, 0.8]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      {/* Right Eye */}
      <group ref={rightEyeRef} position={[0.3, 1.3, 0.8]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
      {/* Left Pupil */}
      <mesh ref={leftPupilRef} position={[-0.3, 1.3, 0.91]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Right Pupil */}
      <mesh ref={rightPupilRef} position={[0.3, 1.3, 0.91]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Ears */}
      <group>
        {/* Left Ear */}
        <mesh ref={earLeftRef} position={[-0.8, 1.5, 0]}>
          <coneGeometry args={[0.3, 1, 32]} />
          <meshStandardMaterial
            color="orange"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        {/* Right Ear */}
        <mesh ref={earRightRef} position={[0.8, 1.5, 0]}>
          <coneGeometry args={[0.3, 1, 32]} />
          <meshStandardMaterial
            color="orange"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      </group>
      {/* Whiskers */}
      <group>
        {/* Left Whiskers */}
        <mesh position={[-0.1, 1.1, 1.05]}>
          <planeGeometry args={[0.5, 0.01]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.1, 1.1, 1.05]}>
          <planeGeometry args={[0.5, 0.01]} />
          <meshStandardMaterial color="black" rotation={[0, 0, Math.PI / 4]} />
        </mesh>
        <mesh position={[-0.1, 1.1, 1.05]}>
          <planeGeometry args={[0.5, 0.01]} />
          <meshStandardMaterial color="black" rotation={[0, 0, -Math.PI / 4]} />
        </mesh>
        {/* Right Whiskers */}
        <mesh position={[0.1, 1.1, 1.05]}>
          <planeGeometry args={[0.5, 0.01]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.1, 1.1, 1.05]}>
          <planeGeometry args={[0.5, 0.01]} />
          <meshStandardMaterial color="black" rotation={[0, 0, Math.PI / 4]} />
        </mesh>
        <mesh position={[0.1, 1.1, 1.05]}>
          <planeGeometry args={[0.5, 0.01]} />
          <meshStandardMaterial color="black" rotation={[0, 0, -Math.PI / 4]} />
        </mesh>
      </group>
      {/* Tail */}
      <mesh position={[0, 0.5, -1]}>
        <cylinderGeometry args={[0.05, 0.1, 1, 16]} />
        <meshStandardMaterial color="orange" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
};

export default Cat;
