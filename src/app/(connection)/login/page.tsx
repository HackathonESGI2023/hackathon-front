"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLoginDto, authLoginSchema } from "@schemas/auth.schema";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { loginUser } from "src/app/api/Auth/login";

import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useRecoilState } from "recoil";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { tokenAtom, userAtom } from "src/utils/recoilAtoms.utils";
import styles from "./page.module.scss";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthLoginDto>({ resolver: zodResolver(authLoginSchema) });

  const router = useRouter();

  const onSubmit = (data: AuthLoginDto) => {
    authLoginMutation.mutate(data);
  };

  const [token, setToken] = useRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const authLoginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (!data.access_token) {
        toast.error("Une erreur est survenue");
        return;
      }
      toast.success("Vous êtes connecté !");
      setToken(data.access_token);
      setUser(data.user);
      router.push("/");
    },
  });

  return (
    <div className={styles.container}>
      <h1>Connectez-vous</h1>
      <p>
        {"Faite combattre votre monstre, parier dessus, et gagner de l'argent"}
      </p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Spacer y={1.3} />

        <Input
          label="Adresse email :"
          placeholder="mrledirecteur@pedagogique.com"
          register={register("email")}
          errorMessage={errors.email?.message}
        />

        <Spacer y={1.3} />

        <Input
          label="Mot de passe :"
          type="password"
          placeholder="********"
          register={register("password")}
          errorMessage={errors.password?.message}
        />

        <Spacer y={2.5} />

        <Button type="submit">Connexion</Button>
      </form>
      <Divider />
      <p className={styles.linkLabel}>
        Mot de passe oublié ?{" "}
        <Link href={"/reset-password"}>
          <span className={styles.ctaLabel}>
            Réinitialisez votre mot de passe
          </span>
        </Link>
      </p>
      <Spacer y={3} />
    </div>
  );
}
