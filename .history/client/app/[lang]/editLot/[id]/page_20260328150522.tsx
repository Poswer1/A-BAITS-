import LotForm from '@/components/lot/lotForm'

interface pageProps {
  params: {
    id:string
  }
}

function page() {

  return (
    <LotForm mode='edit'/>
  )
}

export default page
