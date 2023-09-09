import { footerLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CookieConfig from './CookieConfig';
import PrivacyPolicy from './PrivacyPolicy';

type LinkObj = {
  href: string;
  name: string;
};

type ColumnProps = {
  title: string;
  links: Array<LinkObj>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href={`${link.href}`} key={link.name}>
          {link.name}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col ">
          <Image src="/logo-green.svg" width={116} height={38} alt="logo" />

          <p className="text-start text-sm font-normal mt-3 max-w-xs">
            Empowering Knowledge. Elevating Cannabis Wellness.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex flex-col gap-2">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="footer_column">
              <h4 className="font-semibold">{footerLinks[4].title}</h4>
              <ul className="flex flex-col gap-2 font-normal">
                {footerLinks[4].links.slice(0, -2).map((link) => (
                  <Link href={`${link.href}`} key={link.name}>
                    {link.name}
                  </Link>
                ))}
                {<PrivacyPolicy />}
                {<CookieConfig />}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>@ 2023 Hashibis. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
