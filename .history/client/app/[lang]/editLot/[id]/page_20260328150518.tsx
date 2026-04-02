import LotForm from '@/components/lot/lotForm'

interface pageProps {
  params: {
    
  }
}

function page() {

  return (
    <LotForm mode='edit'/>
  )
}

export default page
