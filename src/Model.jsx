import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { MeshStandardMaterial } from "three";

export default function Model(props) {
  const { newSize, material } = props; // `material` is the selected material from the dropdown
  const { scene, nodes } = useGLTF("/CABINET.glb");

  useEffect(() => {
    // Create a new material based on the selected material
    let newMaterial;
    switch (material) {
      case "metal":
        newMaterial = new MeshStandardMaterial({
          color: "#cccccc", // Metallic gray
          metalness: 1, // Fully metallic
          roughness: 0.5, // Slightly rough
        });
        break;
      case "wood":
        newMaterial = new MeshStandardMaterial({
          color: "#8B4513", // Wood brown
          metalness: 0, // Non-metallic
          roughness: 0.8, // Rough surface
        });
        break;
      case "plastic":
        newMaterial = new MeshStandardMaterial({
          color: "#ff0000", // Red plastic
          metalness: 0, // Non-metallic
          roughness: 0.4, // Smooth surface
        });
        break;
      default:
        newMaterial = new MeshStandardMaterial({
          color: "#ffffff", // Default white
          metalness: 0,
          roughness: 1,
        });
    }

    // List of node names to change material
    const nodesToChange = [
      "3DGeom-1",
      "3DGeom-2",
      "3DGeom-3",
      "3DGeom-4",
      "3DGeom-5",
      "3DGeom-6",
      "3DGeom-7",
      "3DGeom-8",
      "3DGeom-9",
    ]; // Replace with your node names

    // Traverse the nodes and apply the new material only to specific nodes
    Object.values(nodes).forEach((node) => {
      if (node.isMesh && nodesToChange.includes(node.name)) {
        node.material = newMaterial; // Replace the material
      }
    });
  }, [material, nodes]); // Re-run when `material` or `nodes` changes

  return <primitive object={scene} {...props} />;
}
