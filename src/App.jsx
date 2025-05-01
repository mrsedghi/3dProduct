import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useState } from "react";

function App() {
  const [newSize, setNewSize] = useState({
    w: 600,
    h: 760,
    d: 580,
  });

  const [material, setMaterial] = useState("default"); // State for selected material

  // List of available materials
  const materials = [
    { value: "default", label: "Default" },
    { value: "metal", label: "Metal" },
    { value: "wood", label: "Wood" },
    { value: "plastic", label: "Plastic" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-10 ">
      <h1 className="text-4xl font-bold">3D Product</h1>
      <div className="flex flex-row justify-center flex-wrap-reverse items-center gap-5 ring-1 ring-gray-400 rounded-md w-fit p-3 pl-7 max-sm:w-1/2 max-sm:pb-5 max-sm:pl-3">
        <div className="flex flex-col gap-5">
          {/* Material Selection Dropdown */}
          <FormControl fullWidth size="small">
            <InputLabel id="material-select-label">Material</InputLabel>
            <Select
              labelId="material-select-label"
              id="material-select"
              value={material}
              label="Material"
              onChange={(e) => setMaterial(e.target.value)} // Update selected material
            >
              {materials.map((mat) => (
                <MenuItem key={mat.value} value={mat.value}>
                  {mat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dimension Inputs */}
          <div className="flex justify-center items-center gap-2">
            <TextField
              required
              className="w-36"
              id="outlined-basic"
              label="Height"
              variant="outlined"
              size="small"
              type="number"
              value={newSize.h}
              onChange={(e) => {
                const value = Math.max(500, Math.min(1000, e.target.value)); // Ensure value is between 500 and 1000
                setNewSize({ ...newSize, h: value });
              }}
              inputProps={{
                min: 500,
                max: 1000,
                step: 10,
              }}
            />
            mm
          </div>
          <div className="flex justify-center items-center gap-2">
            <TextField
              required
              className="w-36"
              id="outlined-basic"
              label="Width"
              variant="outlined"
              size="small"
              type="number"
              value={newSize.w}
              onChange={(e) => {
                const value = Math.max(500, Math.min(1000, e.target.value)); // Ensure value is between 500 and 1000
                setNewSize({ ...newSize, w: value });
              }}
              inputProps={{
                min: 500,
                max: 1000,
                step: 10,
              }}
            />
            mm
          </div>
          <div className="flex justify-center items-center gap-2">
            <TextField
              required
              className="w-36"
              id="outlined-basic"
              label="Depth"
              variant="outlined"
              size="small"
              type="number"
              value={newSize.d}
              onChange={(e) => {
                const value = Math.max(500, Math.min(1000, e.target.value)); // Ensure value is between 500 and 1000
                setNewSize({ ...newSize, d: value });
              }}
              inputProps={{
                min: 500,
                max: 1000,
                step: 10,
              }}
            />
            mm
          </div>
        </div>
        <div>
          <Canvas
            gl={{ logarithmicDepthBuffer: true, antialias: false }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 15], fov: 35 }}
            className="!h-64"
          >
            <Model
              scale={[
                (parseInt(newSize.w) / 600) * 5.5,
                (parseInt(newSize.h) / 760) * 5.5,
                (parseInt(newSize.d) / 580) * 5.5,
              ]}
              position={[0, -2.5, 0]}
              newSize={newSize}
              material={material} // Pass the selected material to the Model component
            />
            <hemisphereLight intensity={0.5} />
            <Environment resolution={512}>
              {/* Ceiling */}
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, -9]}
                scale={[10, 1, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, -6]}
                scale={[10, 1, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, -3]}
                scale={[10, 1, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, 0]}
                scale={[10, 1, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, 3]}
                scale={[10, 1, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, 6]}
                scale={[10, 1, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-x={Math.PI / 2}
                position={[0, 4, 9]}
                scale={[10, 1, 1]}
              />
              {/* Sides */}
              <Lightformer
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-50, 2, 0]}
                scale={[100, 2, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[50, 2, 0]}
                scale={[100, 2, 1]}
              />
              {/* Key */}
              <Lightformer
                form="ring"
                color="red"
                intensity={10}
                scale={2}
                position={[10, 5, 10]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}
              />
            </Environment>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
