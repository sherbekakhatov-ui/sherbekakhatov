'use client'

import { CalendarDays, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const YANDEX_ROUTE_URL = 'https://yandex.uz/maps/?rtext=~39.026111%2C67.079361&rtt=auto&z=15'

const labels = {
  en: {
    call: 'Call',
    route: 'Route',
    book: 'Prices',
    callHotel: 'Call Miraki Gardens',
    routeHotel: 'Build route to Miraki Gardens',
    bookHotel: 'View prices and open booking form',
  },
  ru: {
    call: 'Звонок',
    route: 'Маршрут',
    book: 'Цены',
    callHotel: 'Позвонить в Miraki Gardens',
    routeHotel: 'Построить маршрут до Miraki Gardens',
    bookHotel: 'Посмотреть цены и открыть форму бронирования',
  },
  uz: {
    call: "Qo'ng'iroq",
    route: 'Marshrut',
    book: 'Narxlar',
    callHotel: "Miraki Gardensga qo'ng'iroq qilish",
    routeHotel: 'Miraki Gardensga marshrut qurish',
    bookHotel: "Narxlarni ko'rish va bron formasini ochish",
  },
}

export default function MobileBottomCTA() {
  const { language, t } = useLanguage()
  const text = labels[language]
  const phoneHref = `tel:${t.contact.phone.replace(/\s/g, '')}`

  const openBooking = () => {
    window.dispatchEvent(new Event('miraki:open-booking'))
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] translate-y-0 border-t border-[#d4af37]/20 bg-[#08120d]/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.72rem)] pt-3 shadow-[0_-18px_45px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-all duration-500 ease-out md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.28fr] gap-2">
        <a
          href={phoneHref}
          aria-label={text.callHotel}
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.055] text-[#f5f0e8] transition active:scale-[0.98]"
        >
          <Phone className="h-5 w-5 text-[#d4af37]" />
          <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-[0.14em]">
            {text.call}
          </span>
        </a>

        <a
          href={YANDEX_ROUTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={text.routeHotel}
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.055] text-[#f5f0e8] transition active:scale-[0.98]"
        >
          <MapPin className="h-5 w-5 text-[#d4af37]" />
          <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-[0.14em]">
            {text.route}
          </span>
        </a>

        <button
          type="button"
          onClick={openBooking}
          aria-label={text.bookHotel}
          className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-3 text-[#10261d] shadow-lg shadow-[#d4af37]/18 transition duration-200 active:scale-[0.98]"
        >
          <CalendarDays className="h-5 w-5" />
          <span className="font-[family-name:var(--font-montserrat)] text-[11px] font-extrabold uppercase tracking-[0.15em]">
            {text.book}
          </span>
        </button>
      </div>
    </div>
  )
}
