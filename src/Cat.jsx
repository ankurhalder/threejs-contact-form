import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Cat = () => {
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const cursor = new THREE.Vector2();
  const maxPupilOffset = 0.05; // Maximum offset for the pupils

  useEffect(() => {
    const handleMouseMove = (event) => {
      cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    const vector = new THREE.Vector3(cursor.x, cursor.y, 0.5).unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    const leftEyePos = new THREE.Vector3(-0.3, 1.3, 0.8);
    const rightEyePos = new THREE.Vector3(0.3, 1.3, 0.8);

    const leftPupilOffset = new THREE.Vector3(
      THREE.MathUtils.clamp(
        (pos.x - leftEyePos.x) * 0.1,
        -maxPupilOffset,
        maxPupilOffset
      ),
      THREE.MathUtils.clamp(
        (pos.y - leftEyePos.y) * 0.1,
        -maxPupilOffset,
        maxPupilOffset
      ),
      0.1 // Slightly in front of the eye
    );

    const rightPupilOffset = new THREE.Vector3(
      THREE.MathUtils.clamp(
        (pos.x - rightEyePos.x) * 0.1,
        -maxPupilOffset,
        maxPupilOffset
      ),
      THREE.MathUtils.clamp(
        (pos.y - rightEyePos.y) * 0.1,
        -maxPupilOffset,
        maxPupilOffset
      ),
      0.1 // Slightly in front of the eye
    );

    leftPupilRef.current.position.copy(leftEyePos.clone().add(leftPupilOffset));
    rightPupilRef.current.position.copy(
      rightEyePos.clone().add(rightPupilOffset)
    );
  });

  return (
    <group>
      {/* Cat's Head */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* Left Eye */}
      <group position={[-0.3, 1.3, 0.8]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh ref={leftPupilRef} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      {/* Right Eye */}
      <group position={[0.3, 1.3, 0.8]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh ref={rightPupilRef} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </group>
  );
};

export default Cat;
