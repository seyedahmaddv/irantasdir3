import type { Route } from "./+types/home";
import HomePage from "../components/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iran Tasdir" },
    { name: "description", content: "Iranian Product Export!" },
  ];
}

export default function Home() {
  return <HomePage />;
}
