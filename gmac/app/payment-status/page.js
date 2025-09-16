import { Suspense } from "react";
import React from 'react'
import PaymentStatus from "./PaymentStatus";

const page = () => {
  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <PaymentStatus />
    </Suspense>
  )
}

export default page