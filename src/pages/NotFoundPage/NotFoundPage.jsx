import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      This Page Does Not Exist <Link to="/">Go Home</Link>
    </div>
  );
}
