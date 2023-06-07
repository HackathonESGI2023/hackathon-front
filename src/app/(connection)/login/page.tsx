"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLoginDto, authLoginSchema } from "@schemas/auth.schema";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { LoginResponse, loginUser } from "src/app/api/Auth/login";

import Divider from "@components/UI/Divider";
import Input from "@components/UI/Input";
import { Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { atom, useRecoilState } from "recoil";

import { toast } from "react-hot-toast";
import styles from "./page.module.scss";
import { tokenAtom, userAtom } from "src/utils/recoilAtoms.utils";
import { UserResponse, getUsers } from "src/app/api/Users/getUsers";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthLoginDto>({ resolver: zodResolver(authLoginSchema) });

  const onSubmit = (data: AuthLoginDto) => {
    console.log("data submite to Mutation", data);
    authLoginMutation.mutate(data);
  };

  const [token, setToken] = useRecoilState(tokenAtom);

  const authLoginMutation = useMutation(loginUser, {
    onSuccess: (data: LoginResponse) => {
      toast.success("Vous êtes connecté !");
      setToken(data.access_token);
      getUserQuery.mutate();
    },
  });

  const [user, setUser] = useRecoilState<UserResponse>(userAtom);
  const getUserQuery = useMutation(getUsers, {
    onSuccess: (data: UserResponse) => {
      setUser(data);
      window.location.href = "/";
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
        Pas de compte ?{" "}
        <Link href={"/register"}>
          <span className={styles.ctaLabel}>Inscrivez-vous ici</span>
        </Link>
      </p>
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
