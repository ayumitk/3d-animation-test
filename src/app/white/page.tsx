import Wrapper from "@/components/gui/Wrapper";

export default function White() {
  const lightIntensity = 40;
  const colorIntensity = 0;
  const roughness = 0.8;
  const metalness = 1.3;

  return (
    <Wrapper
      lightIntensity={lightIntensity}
      colorIntensity={colorIntensity}
      roughness={roughness}
      metalness={metalness}
    />
  );
}
