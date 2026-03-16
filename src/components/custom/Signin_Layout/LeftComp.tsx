// import {
//   Axe,
//   Fence,
//   Gavel,
//   Hammer,
//   LampDesk,
//   Pencil,
//   RockingChair,
//   TreePalm,
//   TreePine,
// } from "lucide-react";
import Logo from "../logo/Logo";

export default function LeftComp() {
  return (
    <div className="w-1/2 hidden lg:flex justify-center items-center min-h-screen bg-[#F9F7F4] relative overflow-hidden">
      <div className="flex gap-4 items-center bg-[#F9F7F4] overflow-hidden z-10 p-4">
        <Logo size={45} className="p-4" />
        <div className="flex flex-col items-center">
          <h2 className="text-[#3D2514] text-5xl font-bold">
            Wood <span className="text-[#F0A535]">craft</span>{" "}
          </h2>
          <p className="text-[#3D2514] text-center">
            Woodwork Management System
          </p>
        </div>
      </div>
      {/* These are some experimantal things */}
      {/* <RockingChair
        className="absolute top-12 left-15"
        color="#F0A535"
        size={70}
      />
      <RockingChair
        className="absolute bottom-60 -right-5"
        color="#F0A535"
        size={70}
      />
      <LampDesk
        className="absolute top-150 -left-5"
        color="#F0A535"
        size={70}
      />
      <LampDesk
        className="absolute top-15 right-15"
        color="#F0A535"
        size={70}
      />
      <TreePine
        className="absolute bottom-15 right-15"
        color="#F0A535"
        size={70}
      />
      <TreePalm
        className="absolute bottom-15 left-15"
        color="#F0A535"
        size={70}
      />
      <Axe className="absolute bottom-80 left-5" color="#F0A535" size={70} />
      <Axe className="absolute top-40 left-100" color="#F0A535" size={70} />
      <Hammer className="absolute top-50 left-160" color="#F0A535" size={45} />
      <Gavel className="absolute top-105 -left-3" color="#F0A535" size={45} />
      <Gavel className="absolute -top-10 right-40" color="#F0A535" size={70} />
      <Fence
        className="absolute bottom-30 left-100"
        color="#F0A535"
        size={45}
      />
      <Fence className="absolute top-30 left-50" color="#F0A535" size={45} />
      <Fence className="absolute top-35 -left-3" color="#F0A535" size={70} />
      <Pencil
        className="absolute bottom-45 left-55"
        color="#F0A535"
        size={45}
      />
      <Pencil className="absolute -top-3 left-70" color="#F0A535" size={45} />
      <Pencil
        className="absolute -bottom-3 left-80"
        color="#F0A535"
        size={70}
      /> */}
    </div>
  );
}
