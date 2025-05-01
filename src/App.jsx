import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Slider,
  Chip,
} from "@mui/material";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import {
  FaPalette,
  FaExpandArrowsAlt,
  FaPause,
  FaPlay,
  FaLightbulb,
  FaRulerVertical,
  FaRulerHorizontal,
  FaRulerCombined,
} from "react-icons/fa";

import { MdOutlineZoomOutMap, MdHeight, MdWidthFull } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { IoIosResize } from "react-icons/io";

function App() {
  const [newSize, setNewSize] = useState({
    w: 600,
    h: 760,
    d: 580,
  });

  const [material, setMaterial] = useState("default");
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const controlsRef = useRef();

  // Auto rotation effect
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = rotationSpeed;
    }
  }, [autoRotate, rotationSpeed]);

  const materials = [
    { value: "default", label: "Default", color: "bg-gray-400" },
    { value: "metal", label: "Metal", color: "bg-gray-600" },
    { value: "wood", label: "Wood", color: "bg-amber-700" },
    { value: "plastic", label: "Plastic", color: "bg-blue-400" },
    { value: "glass", label: "Glass", color: "bg-blue-100" },
  ];

  const handleSizeChange = (dimension, value) => {
    const clampedValue = Math.max(500, Math.min(1000, value));
    setNewSize((prev) => ({ ...prev, [dimension]: clampedValue }));
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Paper
        elevation={0}
        className="max-w-6xl mx-auto p-0 rounded-2xl bg-white overflow-hidden shadow-xl"
      >
        {/* Header */}
        <Box className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
          <Typography
            variant="h3"
            component="h1"
            className="font-bold flex flex-col md:flex-row items-center justify-center gap-3"
          >
            <GiMaterialsScience className="text-3xl" />
            <span>3D Product Configurator</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="text-blue-100 text-center mt-2"
          >
            Customize dimensions and materials in real-time
          </Typography>
        </Box>

        <Box className="flex flex-col lg:flex-row">
          {/* Controls Section */}
          <Box className="w-full lg:w-1/3 p-6 space-y-6">
            {/* Material Selection */}
            <Paper
              elevation={0}
              className="p-4 rounded-xl border border-gray-100"
            >
              <Typography
                variant="h6"
                className="font-semibold text-gray-700 flex items-center gap-2 mb-4"
              >
                <FaPalette className="text-blue-500" />
                Material Selection
              </Typography>
              <FormControl fullWidth size="medium">
                <InputLabel id="material-select-label">
                  Choose Material
                </InputLabel>
                <Select
                  labelId="material-select-label"
                  id="material-select"
                  value={material}
                  label="Choose Material"
                  onChange={(e) => setMaterial(e.target.value)}
                  className="bg-gray-50"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {materials.map((mat) => (
                    <MenuItem key={mat.value} value={mat.value}>
                      <Box className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full ${mat.color} shadow-sm`}
                        ></span>
                        {mat.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>

            {/* Dimensions */}
            <Paper
              elevation={0}
              className="p-4 rounded-xl border border-gray-100"
            >
              <Typography
                variant="h6"
                className="font-semibold text-gray-700 flex items-center gap-2 mb-4"
              >
                <IoIosResize className="text-blue-500 text-xl" />
                Product Dimensions
                <Chip
                  label="mm"
                  size="small"
                  className="ml-auto bg-blue-100 text-blue-800"
                />
              </Typography>

              <Box className="space-y-4">
                <Box className="flex items-center gap-3">
                  <Tooltip title="Height">
                    <IconButton className="bg-blue-50 hover:bg-blue-100">
                      <FaRulerVertical className="text-blue-600" />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    fullWidth
                    label="Height"
                    variant="outlined"
                    size="medium"
                    type="number"
                    value={newSize.h}
                    onChange={(e) => handleSizeChange("h", e.target.value)}
                    InputProps={{
                      endAdornment: <span className="text-gray-500">mm</span>,
                    }}
                    inputProps={{
                      min: 500,
                      max: 1000,
                      step: 10,
                    }}
                  />
                </Box>

                <Box className="flex items-center gap-3">
                  <Tooltip title="Width">
                    <IconButton className="bg-blue-50 hover:bg-blue-100">
                      <FaRulerHorizontal className="text-blue-600" />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    fullWidth
                    label="Width"
                    variant="outlined"
                    size="medium"
                    type="number"
                    value={newSize.w}
                    onChange={(e) => handleSizeChange("w", e.target.value)}
                    InputProps={{
                      endAdornment: <span className="text-gray-500">mm</span>,
                    }}
                    inputProps={{
                      min: 500,
                      max: 1000,
                      step: 10,
                    }}
                  />
                </Box>

                <Box className="flex items-center gap-3">
                  <Tooltip title="Depth">
                    <IconButton className="bg-blue-50 hover:bg-blue-100">
                      <FaRulerCombined className="text-blue-600" />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    fullWidth
                    label="Depth"
                    variant="outlined"
                    size="medium"
                    type="number"
                    value={newSize.d}
                    onChange={(e) => handleSizeChange("d", e.target.value)}
                    InputProps={{
                      endAdornment: <span className="text-gray-500">mm</span>,
                    }}
                    inputProps={{
                      min: 500,
                      max: 1000,
                      step: 10,
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Rotation Controls */}
            <Paper
              elevation={0}
              className="p-4 rounded-xl border border-gray-100"
            >
              <Typography
                variant="h6"
                className="font-semibold text-gray-700 flex items-center gap-2 mb-4"
              >
                <FaLightbulb className="text-blue-500" />
                View Controls
              </Typography>

              <Box className="flex items-center gap-4 mb-4">
                <IconButton
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`${
                    autoRotate ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {autoRotate ? <FaPause /> : <FaPlay />}
                </IconButton>
                <Typography className="flex-1">Auto-rotate</Typography>
              </Box>

              <Box className="space-y-2">
                <Typography variant="body2" className="text-gray-600">
                  Rotation Speed
                </Typography>
                <Slider
                  value={rotationSpeed}
                  onChange={(e, newValue) => setRotationSpeed(newValue)}
                  min={0.5}
                  max={3}
                  step={0.1}
                  aria-labelledby="rotation-speed-slider"
                  valueLabelDisplay="auto"
                  color="primary"
                />
              </Box>
            </Paper>
          </Box>

          {/* 3D Viewer Section */}
          <Box className="w-full lg:w-2/3 bg-gray-50 border-l border-gray-200">
            <Box className="relative h-80 sm:h-96 md:h-[500px] w-full">
              <Canvas
                gl={{ logarithmicDepthBuffer: true, antialias: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 35 }}
                className="absolute inset-0"
              >
                <Model
                  scale={[
                    (parseInt(newSize.w) / 600) * 5.5,
                    (parseInt(newSize.h) / 760) * 5.5,
                    (parseInt(newSize.d) / 580) * 5.5,
                  ]}
                  position={[0, -2.5, 0]}
                  newSize={newSize}
                  material={material}
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

                <OrbitControls
                  ref={controlsRef}
                  autoRotate={autoRotate}
                  autoRotateSpeed={rotationSpeed}
                  enableZoom={true}
                  enablePan={true}
                />
              </Canvas>

              {/* Floating Controls */}
              <Box className="absolute bottom-4 right-4 flex gap-2">
                <Tooltip
                  title={autoRotate ? "Pause rotation" : "Start rotation"}
                >
                  <IconButton
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="bg-white/90 hover:bg-white shadow-md"
                  >
                    {autoRotate ? <FaPause /> : <FaPlay />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset view">
                  <IconButton className="bg-white/90 hover:bg-white shadow-md">
                    <MdOutlineZoomOutMap />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default App;
