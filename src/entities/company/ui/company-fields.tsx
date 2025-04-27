import React from 'react';
import { MenuItem, Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FIELD_OPTIONS } from '@features/create-company/constants';
import { Upload } from '@shared/ui/molecules';
import { CompanyFormValues } from '@entities/company/types';

export const CompanyFields = () => {
  const {
    register,
    control,
    formState: { errors, defaultValues },
  } = useFormContext<CompanyFormValues>();
  console.log(defaultValues?.image);
  return (
    <Stack alignItems="center" width="100%" spacing={2}>
      <Upload accept="image/*" initialValue={defaultValues?.image} {...register('image')} />
      <TextField
        label="Name"
        variant="standard"
        fullWidth
        error={!!errors.name?.message}
        helperText={errors.name?.message}
        {...register('name')}
      />
      <Controller
        name="field"
        control={control}
        render={({ field }) => (
          <TextField
            label="Field"
            variant="standard"
            select
            fullWidth
            error={!!errors.field?.message}
            helperText={errors.field?.message}
            {...field}
          >
            {FIELD_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Stack>
  );
};
