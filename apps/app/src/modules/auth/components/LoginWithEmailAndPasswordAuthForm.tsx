'use client';

import type { FC } from 'react';
import { useTransition } from 'react';
import { Button, Icons, useToast } from 'ui';
import { redirect } from 'next/navigation';
import { signInWithEmailAndPassword } from '../../../app/auth/actions';
import { FormInputField } from '../../../components/form/FormInputField';
import { AppForm } from '../../../components/form/AppForm';
import { loginWithEmailAndPasswordSchema } from '../validations/LoginWithEmailAndPasswordSchema';

export type LoginEmailAndPasswordFormValues = {
  email: string;
  password: string;
};

const LoginWithEmailAndPasswordAuthForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = (formValues: LoginEmailAndPasswordFormValues) => {
    startTransition(async () => {
      const { error } = await signInWithEmailAndPassword(formValues);

      if (error) {
        toast({ title: error.message, variant: 'destructive' });
        return;
      }

      toast({ title: 'Login successful!' });
      redirect('/app');
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <AppForm onSubmit={onSubmit} schema={loginWithEmailAndPasswordSchema}>
        <div className='flex flex-col gap-4'>
          <FormInputField<LoginEmailAndPasswordFormValues>
            label='Email'
            path='email'
            placeholder='name@example.com'
          />

          <FormInputField<LoginEmailAndPasswordFormValues>
            label='Password'
            path='password'
            placeholder='********'
            type='password'
          />
          <Button disabled={isPending} type='submit'>
            {isPending ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Sign In
          </Button>
        </div>
      </AppForm>
    </div>
  );
};
export default LoginWithEmailAndPasswordAuthForm;
