import LotForm from '@/components/lot/lotForm'

interface pageProps {
  params: {
    id:string
  }
}

function page({params} : pageProps) {

  const initialDate:Lo = []

  return (
    <LotForm mode='edit'/>
  )
}

export default page
