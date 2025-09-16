import { Suspense } from "react";
import React from 'react'
import PaymentResult from './PaymentResult'

const page = () => {
  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <PaymentResult />
    </Suspense>
  )
}

export default page
