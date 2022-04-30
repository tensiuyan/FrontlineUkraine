/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStyles } from './style';
import {
  Container,
  InputWrapper,
  Radio,
  TextInput,
  Button,
  Textarea,
  Switch,
  Text,
  Select,
  Modal,
  Group
} from '@mantine/core';
import { Controller, FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { PpeRequestSubForm } from './components/PpeRequestSubForm';
import {
  getDisplayNameMessageID,
  getPpeTypeEnumFromInt,
} from '../../models/ppeType';
import { ReactHookFormRadioGroup } from '../../components/ReactHookFormRadioGroup';
import {
  defaultRegisterRequestForm,
  ORG_TYPES,
  RegisterRequestForm,
} from './types';
import { VALIDATION_MSG } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@mantine/notifications';
import {
  APIError,
  isSchemaValidationErrorData,
  useAPIContext,
} from '../../contexts/APIContext';
import { ReactHookFormPosttagAddressAutocomplete } from '../../components/ReactHookFormPosttagAddressAutocomplete';
import { AddressEntry } from '../../models/posttag';
import { FormattedMessage } from '../../locale/FormattedMessage';
import { ProcedureList } from './components/ProcedureList';
import { useLocale } from '../../locale/LocaleProvider';
import { RESOURCE_GROUPS } from '../../constants/resourceGroup';
import { ApiState } from '../../utils/apiState';
import { Paginated } from '../../models/paginated';
import { City } from '../../models/city';

export const RegisterNeeds: React.FC = () => {
  const { classes } = useStyles();
  const { locale, renderToString } = useLocale();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const notification = useNotifications();
  const {
    actions: { createRequest, getCityList },
  } = useAPIContext();
  const [cityListState, setCityListState] = useState<ApiState<Paginated<City>>>(
    {
      state: 'init',
    }
  );
  const cityListOptions = useMemo(() => {
    let cityListData: City[] = [];
    if (cityListState.state === 'loading' || cityListState.state === 'idle') {
      cityListData = cityListState.data?.data ?? [];
    }
    return cityListData.map(({ id, name }) => ({
      value: `${id}`,
      label: name[locale],
    }));
  }, [cityListState, locale]);
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState,
    setError,
    setValue,
  } = useForm<RegisterRequestForm>({
    defaultValues: defaultRegisterRequestForm,
  });
  const { isSubmitting, errors, isSubmitSuccessful } = formState;
  const handleAddressSelect = useCallback(
    (item: AddressEntry) => {
      setValue('addressLineOne', item.addressLineOne);
      setValue('addressLineTwo', item.addressLineTwo);
    },
    [setValue]
  );
  const handleValidSubmit: SubmitHandler<RegisterRequestForm> = useCallback(
    async (data) => {
      await createRequest(data);
      notification.showNotification({
        color: 'flGreen',
        title: (
          <FormattedMessage id="i_need_form_message_save_successful_title" />
        ),
        message: (
          <FormattedMessage id="i_need_form_message_save_successful_message" />
        ),
        autoClose: 10000,
        onClose: () => {
          navigate('/');
        },
      });
    },
    [createRequest, navigate, notification]
  );
  const handleSubmitError = useCallback(
    (e: APIError) => {
      console.error(e);
      const data = e.data;
      if (!isSchemaValidationErrorData(data)) {
        notification.showNotification({
          color: 'red',
          title: (
            <FormattedMessage id="i_need_form_message_cannot_save_error_title" />
          ),
          message: (
            <FormattedMessage id="i_need_form_message_cannot_save_error_message" />
          ),
          autoClose: 5000,
        });
        return;
      }
      data.detail.forEach((fieldError) => {
        const { loc, msg, type } = fieldError;
        let key = loc[loc.length - 1] as FieldPath<RegisterRequestForm>;
        if (key === 'ppeTypes') {
          // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
          // select at least one of the PPE type.
          key = 'ppeTypes.AlcoholHandGel.need';
        }
        setError(key, {
          message: msg,
          type: type,
        });
      });
      notification.showNotification({
        color: 'red',
        title: (
          <FormattedMessage id="i_need_form_message_cannot_save_error_title" />
        ),
        message: (
          <FormattedMessage id="i_need_form_message_cannot_save_error_title" />
        ),
        autoClose: 5000,
      });
    },
    [notification, setError]
  );
  const watchedPpe = watch('ppeTypes');
  const watchedOrgType = watch('orgType');
  useEffect(() => {
    const fn = async () => {
      try {
        setCityListState((prev) => ({ ...prev, state: 'loading' }));
        setCityListState({
          state: 'idle',
          lastFetchedAt: new Date(),
          data: await getCityList(),
        });
      } catch (error: unknown) {
        setCityListState((prev) => ({
          ...prev,
          state: 'error',
          lastFetchedAt: new Date(),
          error,
        }));
      }
    };
    fn().catch(console.error);
  }, [getCityList]);

  return (
    <div className={classes.scrollContainer}>
      <Container>
        <h1 className={classes.header}>
          <FormattedMessage id="i_need_form_title" />
        </h1>
        <section className={classes.section}>
          <FormattedMessage
            id="i_need_form_form_intro"
            components={{
              ProcedureList,
            }}
          />
        </section>
        <section className={classes.section}>
          <DevTool control={control} />
          <form
            onSubmit={async (e) =>
              handleSubmit(handleValidSubmit)(e).catch(handleSubmitError)
            }
          >
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>
                {renderToString('i_need_form_fieldset_your_detail_title')}
              </legend>
              <InputWrapper
                error={errors.publishAnonymously?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_your_detail_field_publish_anonymously_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_your_detail_field_publish_anonymously_description'
                )}
                required={true}
              >
                <Switch {...register('publishAnonymously')} size="md" />
              </InputWrapper>
              <TextInput
                {...register('contactName', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.contactName?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_your_detail_field_contact_name_title'
                )}
                description={
                  <FormattedMessage id="i_need_form_fieldset_your_detail_field_contact_name_description" />
                }
                required={true}
              />
              <TextInput
                {...register('email', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.email?.message}
                className={classes.inputWrapper}
                type="email"
                label={renderToString(
                  'i_need_form_fieldset_your_detail_field_contact_email_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_your_detail_field_contact_email_description'
                )}
                required={true}
              />
              <TextInput
                {...register('phoneNumber', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.phoneNumber?.message}
                className={classes.inputWrapper}
                type="tel"
                label={renderToString(
                  'i_need_form_fieldset_your_detail_field_contact_phone_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_your_detail_field_contact_phone_description'
                )}
                required={true}
              />
            </fieldset>
            {RESOURCE_GROUPS.map((group) => (
              <fieldset key={group.id} className={classes.fieldSet}>
                <legend className={classes.legend}>
                  <FormattedMessage id={group.name} />
                </legend>
                {group.description && (
                  <Text color="dimmed" size="sm">
                    <FormattedMessage id={group.description} />
                  </Text>
                )}
                {group.type === 'node' &&
                  group.subGroups.map((subGroup) => (
                    <InputWrapper
                      key={`${group.id}_${subGroup.id}`}
                      label={<FormattedMessage id={subGroup.name} />}
                      className={classes.inputWrapper}
                      labelElement="div"
                      description={
                        subGroup.description && (
                          <FormattedMessage id={subGroup.description} />
                        )
                      }
                      // NOTE: Hijack this field to show the validation error of ppeTypes. User need to
                      // select at least one of the PPE type.
                      error={errors.ppeTypes?.AlcoholHandGel?.need?.message}
                    >
                      {subGroup.type === 'leaf' &&
                        subGroup.resourceTypes.map((resourceType) => {
                          const typeEnum = getPpeTypeEnumFromInt(
                            resourceType.id
                          );
                          if (typeEnum == null) return <></>;
                          return (
                            <div key={resourceType.id}>
                              <Switch
                                {...register(`ppeTypes.${typeEnum}.need`)}
                                className={classes.switchInput}
                                label={renderToString(
                                  getDisplayNameMessageID(typeEnum)
                                )}
                                size="md"
                              />
                              {watchedPpe[typeEnum].need && (
                                <PpeRequestSubForm
                                  ppeType={typeEnum}
                                  control={control}
                                  register={register}
                                  formState={formState}
                                  shouldUnregister={true}
                                />
                              )}
                            </div>
                          );
                        })}
                    </InputWrapper>
                  ))}
              </fieldset>
            ))}
            <fieldset className={classes.fieldSet}>
              <legend className={classes.legend}>
                <FormattedMessage id="i_need_form_fieldset_organisation_title" />
              </legend>
              <TextInput
                {...register('organisationName', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.organisationName?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_organisation_field_organisation_name_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_organisation_field_organisation_name_description'
                )}
                required={true}
              />
              <TextInput
                {...register('orgRegCode', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.orgRegCode?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_organisation_field_org_reg_code_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_organisation_field_org_reg_code_description'
                )}
                required={true}
              />
              <ReactHookFormRadioGroup
                name="orgType"
                control={control}
                rules={{
                  required: { value: true, message: VALIDATION_MSG.required },
                }}
                error={errors.orgType?.message}
                classNames={{ root: classes.inputWrapper }}
                orientation="vertical"
                label={renderToString(
                  'i_need_form_fieldset_organisation_field_org_type_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_organisation_field_org_type_description'
                )}
                required={true}
              >
                {ORG_TYPES.map(({ value, name }) => (
                  <Radio
                    key={value}
                    value={value}
                    label={<FormattedMessage id={name} />}
                  />
                ))}
              </ReactHookFormRadioGroup>
              {watchedOrgType === 'Other' && (
                <TextInput
                  {...register('orgTypeOther', {
                    required: { value: true, message: VALIDATION_MSG.required },
                    shouldUnregister: true,
                  })}
                  error={errors.orgTypeOther?.message}
                  className={classes.inputWrapper}
                  label="Type Other"
                  description={`If the list above does not fit choose "Other..." and describe here`}
                />
              )}

              <TextInput
                {...register('jobTitle', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.jobTitle?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_organisation_field_job_title_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_organisation_field_job_title_description'
                )}
                required={true}
              />
              <TextInput
                {...register('department', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.department?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_organisation_field_department_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_organisation_field_department_description'
                )}
                required={true}
              />
            </fieldset>
            <fieldset className={classes.fieldSet}>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                size="full"
                title="Turn on your GPS and get the 3 words that describe your exact location"
              >
                <iframe width="100%" height="800px" allow="geolocation *; clipboard-read; clipboard-write"  src="https://what3words.com"></iframe>
              </Modal>

              <Group position="left">
                <Button onClick={() => setOpened(true)}>Get What3Words</Button>
              </Group>
              <legend className={classes.legend}>
                {renderToString(
                  'i_need_form_fieldset_additional_details_title'
                )}
              </legend>
              <TextInput
                {...register('addressLineOne', {
                  required: { value: true, message: VALIDATION_MSG.required },
                })}
                error={errors.addressLineOne?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_additional_details_field_address_line_1_title'
                )}
                required={true}
              />
              <TextInput
                {...register('addressLineTwo')}
                error={errors.addressLineTwo?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_additional_details_field_address_line_2_title'
                )}
              />
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: renderToString('common_required_field_error'),
                  },
                }}
                name="orgCityId"
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => {
                  return (
                    <Select
                      {...rest}
                      label={renderToString(
                        'i_need_form_fieldset_additional_details_field_city_title'
                      )}
                      error={error?.message}
                      required={true}
                      onChange={(newVal) => onChange(newVal)}
                      data={cityListOptions}
                      searchable={true}
                      styles={(theme) => ({ selected: { color: theme.white } })}
                    />
                  );
                }}
              />
              <ReactHookFormPosttagAddressAutocomplete
                control={control}
                name="postcode"
                rules={{
                  required: { value: true, message: VALIDATION_MSG.required },
                }}
                error={errors.postcode?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_additional_details_field_postcode_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_additional_details_field_postcode_description'
                )}
                required={true}
                onAddressSelect={handleAddressSelect}
              />
              <div>
              </div>
              <Textarea
                {...register('tellUsMore')}
                error={errors.tellUsMore?.message}
                className={classes.inputWrapper}
                label={renderToString(
                  'i_need_form_fieldset_additional_details_field_tell_us_more_title'
                )}
                description={renderToString(
                  'i_need_form_fieldset_additional_details_field_tell_us_more_description'
                )}
              />
            </fieldset>
            <Button
              className={classes.submitBtn}
              variant="filled"
              type="submit"
              disabled={isSubmitSuccessful}
              loading={isSubmitting}
            >
              <FormattedMessage
                id={
                  isSubmitSuccessful
                    ? 'i_need_form_form_submit_title_saved'
                    : 'i_need_form_form_submit_title_save'
                }
              />
            </Button>
          </form>
        </section>
      </Container>
    </div>
  );
};
