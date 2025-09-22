import { ReactNode } from 'react';
import { FaDiscord, FaGithub, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://discord.gg/uhZbmVcpS7',
    label: 'Discord',
    icon: <FaDiscord className="h-4 w-4" />,
  },
  {
    href: 'https://github.com/sydney-competitive-programming-club',
    label: 'GitHub',
    icon: <FaGithub className="h-4 w-4" />,
  },
  {
    href: 'https://www.instagram.com/scpc_usyd/',
    label: 'Instagram',
    icon: <FaInstagram className="h-4 w-4" />,
  },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 text-sm text-white/70 md:flex-row md:justify-between">
        <div className="max-w-sm space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">About SCPC</h3>
          <p>
            Sydney Competitive Programming Club is dedicated to helping students improve their algorithmic thinking and competitive
            programming skills.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-10 sm:flex-row sm:justify-end">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="/" className="transition hover:text-white">Home</a></li>
              <li><a href="/about" className="transition hover:text-white">About</a></li>
              <li>
                <a href="/gym" className="transition hover:text-white">Practice Gym</a>
              </li>
              <li>
                <a href="https://discord.gg/uhZbmVcpS7" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  Discord Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Connect</h3>
            <div className="mt-3 flex gap-3">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-slate-950/80 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Sydney Competitive Programming Club</span>
          <span>Developed by James Zhao</span>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/25 hover:text-white"
    >
      {icon}
    </a>
  );
}

export default Footer;
