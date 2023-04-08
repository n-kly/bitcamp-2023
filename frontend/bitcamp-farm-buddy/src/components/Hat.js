import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

const Hat = () => {

    const mount = useRef(null);

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
    );

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a hat
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const hat = new THREE.Mesh(geometry, material);

    // Add hat to scene
    scene.add(hat);
    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
      
        hat.rotation.x += 0.01;
        hat.rotation.y += 0.01;
      
        renderer.render(scene, camera);
      };
      
      useEffect(() => {
          animate();
        });

    return (
        <div ref="mount" />
    )
}  

export default Hat;