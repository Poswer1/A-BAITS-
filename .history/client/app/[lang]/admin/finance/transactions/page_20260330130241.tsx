import { getAllTransactions } from '@/services/admin/finance';
import React from 'react'

export default async function page() {

    const transactions = await getAllTransactions();

  return (
    <div>
      
    </div>
  )
}


