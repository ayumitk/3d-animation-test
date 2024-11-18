import Wrapper from "@/components/gui/Wrapper";

export default function Color() {
  const lightIntensity = 5;
  const colorIntensity = 10;
  const roughness = 0.4;
  const metalness = 0.9;

  return (
    <Wrapper
      lightIntensity={lightIntensity}
      colorIntensity={colorIntensity}
      roughness={roughness}
      metalness={metalness}
    />
  );
}
