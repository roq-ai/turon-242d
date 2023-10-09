import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getLocationById, updateLocationById } from 'apiSdk/locations';
import { locationValidationSchema } from 'validationSchema/locations';
import { LocationInterface } from 'interfaces/location';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';

function LocationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<LocationInterface>(
    () => (id ? `/locations/${id}` : null),
    () => getLocationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: LocationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateLocationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/locations');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<LocationInterface>({
    initialValues: data,
    validationSchema: locationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Locations',
              link: '/locations',
            },
            {
              label: 'Update Location',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Location
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.city}
            label={'City'}
            props={{
              name: 'city',
              placeholder: 'City',
              value: formik.values?.city,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.state}
            label={'State'}
            props={{
              name: 'state',
              placeholder: 'State',
              value: formik.values?.state,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.country}
            label={'Country'}
            props={{
              name: 'country',
              placeholder: 'Country',
              value: formik.values?.country,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.zip_code}
            label={'Zip Code'}
            props={{
              name: 'zip_code',
              placeholder: 'Zip Code',
              value: formik.values?.zip_code,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.street}
            label={'Street'}
            props={{
              name: 'street',
              placeholder: 'Street',
              value: formik.values?.street,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/locations')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'location',
    operation: AccessOperationEnum.UPDATE,
  }),
)(LocationEditPage);
