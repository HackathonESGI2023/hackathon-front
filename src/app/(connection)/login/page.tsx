'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLoginDto, authLoginSchema } from '@schemas/auth.schema';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { loginUser } from 'src/app/api/Auth/login';

import Divider from '@components/UI/Divider';
import Input from '@components/UI/Input';
import { Button, Spacer } from '@nextui-org/react';
import Link from 'next/link';

import { toast } from 'react-hot-toast';
import styles from './page.module.scss';

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthLoginDto>({ resolver: zodResolver(authLoginSchema) });

  const onSubmit = (data: AuthLoginDto) => {
    console.log('data submite to Mutation', data);
    authLoginMutation.mutate(data);
  };

  const authLoginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      toast.success('Vous êtes connecté !');
    },
  });

  console.log(watch('email'), watch('password'));

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
          register={register('email')}
          errorMessage={errors.email?.message}
        />

        <Spacer y={1.3} />

        <Input
          label="Mot de passe :"
          type="password"
          placeholder="********"
          register={register('password')}
          errorMessage={errors.password?.message}
        />

        <Spacer y={2.5} />

        <Button type="submit">Connexion</Button>
      </form>
      <Divider />
      <p className={styles.linkLabel}>
        Pas de compte ?{' '}
        <Link href={'/register'}>
          <span className={styles.ctaLabel}>Inscrivez-vous ici</span>
        </Link>
      </p>
      <p className={styles.linkLabel}>
        Mot de passe oublié ?{' '}
        <Link href={'/reset-password'}>
          <span className={styles.ctaLabel}>
            Réinitialisez votre mot de passe
          </span>
        </Link>
      </p>
      <Spacer y={3} />
    </div>
  );
}
