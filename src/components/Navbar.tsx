"use client";
import { Button, Link, Navbar, Switch, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "src/utils/recoilAtoms.utils";

type NavbarTestProps = {
  className?: string;
};

const NavbarTest = ({ className }: NavbarTestProps) => {
  const [variant, setVariant] = useState("default");
  const [activeColor, setActiveColor] = useState("primary");

  const { isDark } = useTheme();
  const router = useRouter();
  const { setTheme } = useNextTheme();

  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <Navbar
      isBordered={isDark}
      variant="floating"
      maxWidth="fluid"
      className={className}
      style={{
        padding: "1rem",
      }}
    >
      <Navbar.Brand>
        <Image
          src="/images/carbon-logo.svg"
          alt="Acme Logo"
          width={100}
          height={100}
        />
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Item>
          <Button
            auto
            as={Link}
            color="primary"
            onPress={() => router.push("/")}
            light
          >
            Accueil
          </Button>
        </Navbar.Item>
        {!token && (
          <Navbar.Item>
            <Button
              auto
              as={Link}
              color="primary"
              light
              onPress={() => router.push("/postuler")}
            >
              Postuler chez Carbon
            </Button>
          </Navbar.Item>
        )}
        <Navbar.Item>
          {!token ? (
            <Button
              auto
              as={Link}
              color="primary"
              onPress={() => router.push("/login")}
            >
              Se connecter
            </Button>
          ) : token && user?.roles.includes("SUPPORT") ? (
            <Button
              auto
              as={Link}
              color="primary"
              onPress={() => router.push("/dashboard")}
            >
              Administration
            </Button>
          ) : (
            <Button
              auto
              as={Link}
              color="primary"
              onPress={() => router.push("/profile")}
            >
              Mon espace consultant
            </Button>
          )}
        </Navbar.Item>
        {token && (
          <Navbar.Item>
            <Button
              auto
              as={Link}
              color="primary"
              onPress={() => handleLogout()}
            >
              Se déconnecter
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarTest;
