import React from "react";
import { HashLoader } from "react-spinners";
import LoadingModal from "../components/LoadingModal";

export default function loading() {
  return <LoadingModal visible={true} />;
}
