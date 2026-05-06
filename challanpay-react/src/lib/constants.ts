export const WHATSAPP_NUMBER = '919599648108'
export const SUPPORT_EMAIL = 'support@challanpay.com'

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Track Challan', href: '/#track' },
    { label: 'Road Smart Partners', href: '/road-smart-partners' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Blogs', href: '/blogs' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/terms' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '#contact' },
  ],
} as const

export const COMPANY_INFO = {
  name: 'Sproutech Solutions Private Limited',
  address: 'India Accelerator Coworking, Lower Ground Floor, LG-007-02, MGF Metropolis Mall, MG Road, Gurugram, Haryana, 122002',
} as const

export const VEHICLE_NUMBER_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/
