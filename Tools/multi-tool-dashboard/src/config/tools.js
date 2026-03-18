import {
  Calculator,
  CaseSensitive,
  Fingerprint,
  MapPinned,
  Palette,
  QrCode,
  ShieldCheck,
} from 'lucide-react'
import ChromaCraft from '../tools/components/ChromaCraft.jsx'
import InterestCalcPro from '../tools/components/InterestCalcPro.jsx'
import NICFinder from '../tools/components/NICFinder.jsx'
import PostalCodeFinder from '../tools/components/PostalCodeFinder.jsx'
import QRCodeGenerator from '../tools/components/QRCodeGenerator.jsx'
import SecurePasswordGenerator from '../tools/components/SecurePasswordGenerator.jsx'
import TextTransformerPro from '../tools/components/TextTransformerPro.jsx'

export const toolItems = [
  {
    slug: 'qr-master',
    label: 'QR Master',
    description: 'Generate, preview, and export QR codes without leaving the dashboard.',
    eyebrow: 'Smart sharing tools',
    statsLabel: 'QR Output',
    statsValue: 'PNG ready',
    icon: QrCode,
    component: QRCodeGenerator,
  },
  {
    slug: 'nic-finder',
    label: 'NIC Finder',
    description: 'Decode Sri Lankan NIC details fast with an embedded results workspace.',
    eyebrow: 'Identity utilities',
    statsLabel: 'Lookup flow',
    statsValue: 'Instant',
    icon: Fingerprint,
    component: NICFinder,
  },
  {
    slug: 'securepass-pro',
    label: 'SecurePass Pro',
    description: 'Store, reveal, copy, and manage credentials from a single protected view.',
    eyebrow: 'Security toolkit',
    statsLabel: 'Vault mode',
    statsValue: 'Local save',
    icon: ShieldCheck,
    component: SecurePasswordGenerator,
  },
  {
    slug: 'postal-finder',
    label: 'Postal Finder',
    description: 'Search Sri Lankan post offices and postal codes with faster route-level navigation.',
    eyebrow: 'Location helpers',
    statsLabel: 'Data source',
    statsValue: 'SL Post',
    icon: MapPinned,
    component: PostalCodeFinder,
  },
  {
    slug: 'text-transformer',
    label: 'Text Transformer',
    description: 'Edit content, track live writing stats, and copy transformed text in one panel.',
    eyebrow: 'Writing studio',
    statsLabel: 'Live stats',
    statsValue: 'Real-time',
    icon: CaseSensitive,
    component: TextTransformerPro,
  },
  {
    slug: 'chroma-craft',
    label: 'ChromaCraft',
    description: 'Preview colors, convert formats, and keep your palette workflow in sync.',
    eyebrow: 'Design utilities',
    statsLabel: 'Color modes',
    statsValue: 'HEX/RGB/HSL',
    icon: Palette,
    component: ChromaCraft,
  },
  {
    slug: 'interest-calc',
    label: 'InterestCalc',
    description: 'Switch between simple and compound calculations inside a focused finance workspace.',
    eyebrow: 'Finance helper',
    statsLabel: 'Modes',
    statsValue: '2 engines',
    icon: Calculator,
    component: InterestCalcPro,
  },
]
