import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Cat = () => {
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
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
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* Left Eye */}
      <group ref={leftEyeRef} position={[-0.3, 1.3, 0.8]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh ref={leftPupilRef} position={[0, 0, 0.11]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      {/* Right Eye */}
      <group ref={rightEyeRef} position={[0.3, 1.3, 0.8]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh ref={rightPupilRef} position={[0, 0, 0.11]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </group>
  );
};

export default Cat;