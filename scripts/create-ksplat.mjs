import fs from "node:fs";
import * as THREE from "three";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

if (process.argv.length < 4) {
  console.log("Usage: node create-ksplat.mjs <input.ply> <output.ksplat> [compression=1] [alpha=5]");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const compressionLevel = Number.parseInt(process.argv[4] ?? "1", 10);
const alphaRemovalThreshold = Number.parseInt(process.argv[5] ?? "5", 10);

const fileData = fs.readFileSync(inputFile);
const arrayBuffer = fileData.buffer.slice(
  fileData.byteOffset,
  fileData.byteOffset + fileData.byteLength,
);

const format = GaussianSplats3D.LoaderUtils.sceneFormatFromPath(inputFile.toLowerCase().trim());

if (format !== GaussianSplats3D.SceneFormat.Ply && format !== GaussianSplats3D.SceneFormat.Splat) {
  throw new Error(`Unsupported input format: ${inputFile}`);
}

let splatBuffer;

if (format === GaussianSplats3D.SceneFormat.Ply) {
  const splatArray = GaussianSplats3D.PlyParser.parseToUncompressedSplatArray(arrayBuffer, 0);
  const splatBufferGenerator = GaussianSplats3D.SplatBufferGenerator.getStandardGenerator(
    alphaRemovalThreshold,
    compressionLevel,
    0,
    new THREE.Vector3(0, 0, 0),
    5.0,
    256,
  );

  splatBuffer = splatBufferGenerator.generateFromUncompressedSplatArray(splatArray);
} else {
  const splatArray = GaussianSplats3D.SplatParser.parseStandardSplatToUncompressedSplatArray(
    arrayBuffer,
  );
  const splatBufferGenerator = GaussianSplats3D.SplatBufferGenerator.getStandardGenerator(
    alphaRemovalThreshold,
    compressionLevel,
    0,
    new THREE.Vector3(0, 0, 0),
    5.0,
    256,
  );

  splatBuffer = splatBufferGenerator.generateFromUncompressedSplatArray(splatArray);
}

fs.writeFileSync(outputFile, Buffer.from(splatBuffer.bufferData));
console.log(`KSPLAT created: ${outputFile}`);
