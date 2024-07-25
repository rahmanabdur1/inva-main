import { FontLoader, Vector3, TextBufferGeometry } from "three";
import React, { useCallback, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { useAsset } from "use-asset";
import lerp from "lerp";
import state from "../store";

function Text({
  children,
  size = 1,
  left,
  right,
  top,
  bottom,
  color = "white",
  opacity = 1,
  height = 0.01,
  layers = 0,
  font = "/MOONGET_Heavy.blob",
  ...props
}: any) {
  const data: any = useLoader(FontLoader, font);
  const geom: any = useAsset(
    () =>
      new Promise((res) =>
        res(
          new TextBufferGeometry(children, {
            font: data,
            size: 1,
            height,
            curveSegments: 32,
          })
        )
      )
  );
  const onUpdate = useCallback(
    (self) => {
      const box = new Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(box);
      self.position.x = left ? 0 : right ? -box.x : -box.x / 2;
      self.position.y = top ? 0 : bottom ? -box.y : -box.y / 2;
    },
    [left, right, top, bottom]
  );

  const ref: any = useRef();
  let last = state.top.current;
  useFrame(() => {
    ref.current.shift = lerp(
      ref.current.shift,
      (state.top.current - last) / 100,
      0.1
    );
    last = state.top.current;
  });

  return (
    <group {...props} scale={[size, size, 0.1]}>
      {/* @ts-ignore */}
      <mesh geometry={geom} onUpdate={onUpdate} frustumCulled={false}>
        {/* @ts-ignore */}
        <customMaterial ref={ref} color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

const MultilineText = ({
  text,
  size = 1,
  lineHeight = 1,
  position = [0, 0, 0],
  ...props
}: any) =>
  text
    .split("\n")
    .map((text: any, index: number) => (
      <Text
        key={index}
        size={size}
        {...props}
        position={[position[0], position[1] - index * lineHeight, position[2]]}
        children={text}
      />
    ));

export { Text, MultilineText };
