import '../../global.css'
import {Navbar} from '../../components/nav'
import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function PostLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
