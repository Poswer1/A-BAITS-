import LotForm from '@/components/lot/lotForm'

interface pageProps {
  params: {
    id:string
  }
}

function page({params} : pageProps) {

  return (
    <LotForm mode='edit'/>
  )
}

export default page
