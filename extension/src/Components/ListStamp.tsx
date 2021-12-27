import React from "react";
import logo from "../logo.svg";
import { useStamp } from "../StampContext";

interface Props {
  stampId: string;
}

export default function ListStamp({ stampId }: Props) {
  const [stamp, setStamp] = useStamp(stampId);
  return <div>{stamp.type}</div>;
}
