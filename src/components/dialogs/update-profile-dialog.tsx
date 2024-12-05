'use client';
import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { updateProfileSchema, UpdateProfileSchema } from '@/lib/form-schemas';
import { updateProfileKey, useUpdateProfile } from '@/mutations/use-update-profile';
import { useProfile } from '@/queries/use-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStore } from '@jodd/snap';
import { useIsMutating } from '@tanstack/react-query';
import { MapPin, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

const useUpdateProfileDialog = createStore<{ isOpen: boolean }>(() => ({ isOpen: false }));

const onOpenChange = (isOpen: boolean) => useUpdateProfileDialog.setState({ isOpen });
export const openUpdateProfileDialog = () => onOpenChange(true);
export const closeUpdateProfileDialog = () => onOpenChange(false);

export default function UpdateProfileDialog() {
  const { data: profile } = useProfile();
  if (!profile) return;

  return <BaseDialog />;
}

function BaseDialog() {
  const { data: profile } = useProfile();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name || '',
      address: profile?.address || '',
      phone: profile?.phone || undefined
    }
  });
  const { mutate } = useUpdateProfile();
  const isUpdatingProfile = !!useIsMutating({ mutationKey: updateProfileKey });

  const onSubmit = (data: UpdateProfileSchema) => {
    mutate(data, {
      onSuccess() {
        closeUpdateProfileDialog();
        reset();
      }
    });
  };

  const { isOpen } = useUpdateProfileDialog();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
          <FormInput
            Icon={User}
            id="name"
            label="Name"
            placeholder="Ayushma Dhungana..."
            {...register('name')}
            error={errors.name?.message}
          />
          <FormInput
            Icon={MapPin}
            id="address"
            {...register('address')}
            label="Address"
            placeholder="Bharatpur-2, Chitwan..."
            error={errors.address?.message}
          />
          <FormInput
            Icon={Phone}
            id="phone"
            {...register('phone')}
            label="Phone"
            type="number"
            placeholder="9845620397..."
            error={errors.phone?.message}
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isUpdatingProfile}
            loading={isUpdatingProfile}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
