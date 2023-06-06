'use client';
import { Button, Link, Navbar, Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type NavbarTestProps = {
  className?: string;
};

const NavbarTest = ({ className }: NavbarTestProps) => {
  const [variant, setVariant] = useState('default');
  const [activeColor, setActiveColor] = useState('primary');

  const { isDark } = useTheme();
  const router = useRouter();
  const { setTheme } = useNextTheme();

  return (
    <Navbar
      isBordered={isDark}
      variant="floating"
      maxWidth="fluid"
      className={className}
    >
      <Navbar.Brand>
        <Image
          src="/images/carbon-logo.svg"
          alt="Acme Logo"
          width={100}
          height={100}
        />
      </Navbar.Brand>
      <Navbar.Content
        activeColor="primary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link href="#"> Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
        <Navbar.Link color="inherit" onClick={() => router.push('/admin')}>
          ADMIN
        </Navbar.Link>
        <Navbar.Link color="inherit" onClick={() => router.push('/login')}>
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button
            auto
            flat
            as={Link}
            color="primary"
            onClick={() => router.push('/register')}
          >
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarTest;
