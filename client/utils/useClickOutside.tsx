import { useEffect, useRef } from "react"

export function useClickOutside(setOpen: (t: boolean) => void) {

    const modalRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
      
      const handleClickOutside = (e:MouseEvent) => {
        if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      // current - текущий
      // contains - содержит
      // modalRef.current это модалка наша 
      // //modalRef.current.contains(e.targer) проверяет клик по модалке ли и возрощает true или false 
      // //e.target это место куда кликнул пользователь
      }

      document.addEventListener('mousedown', handleClickOutside) // начинаем слушать клики по всему экрану.
      return () => document.removeEventListener('mousedown', handleClickOutside); // убираем слушатель, когда модалка закрывается

    }, [setOpen])

    return modalRef
}
