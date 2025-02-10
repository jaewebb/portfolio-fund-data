// import Image from 'next/image'
import EtfSection from '@/app/components/fund/EtfSection'

export default function Home() {
  const year = new Date(Date.now()).getFullYear()
  return (
    <div className="
      grid grid-rows-[20px_1fr_20px]
      items-center justify-items-center
      min-h-screen
      p-8 pb-20 gap-16 sm:p-20
    ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {<EtfSection />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span>&copy; Jae Webb {year}</span>
        <span>Built using <a href="https://twelvedata.com/" target='_blank'>Twelve Data&apos;s</a> basic plan</span>
      </footer>
    </div>
  )
}
