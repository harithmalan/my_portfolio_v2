// Google Drive "view" links can be used directly, but the uc?export=download
// form triggers an actual file download instead of opening the preview page.
const CV_FILE_ID = '1Nhx7U0Tbt5Xc2NtMnhPtrFM4qElkM6Dz'

export const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`

export const CONTACT = {
  phone: '+94 76 857 0754',
  phoneHref: 'tel:+94768570754',
  whatsapp: 'https://wa.me/94768570754',
  email: 'malanharith@gmail.com',
  address: '150, Rajagiriya Rd, Rajagiriya',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=150+Rajagiriya+Rd%2C+Rajagiriya',
}

// TODO: swap in your real profile URLs — these are placeholders since a CV
// doesn't carry the actual link destinations, only the visible "LinkedIn" text.
export const SOCIAL_LINKS = {
  github: 'https://github.com/harithmalan',
  linkedin: 'https://www.linkedin.com/in/harith-malan-1b7193320',
  instagram: 'https://instagram.com/harith.4.real',
  email: CONTACT.email,
}

