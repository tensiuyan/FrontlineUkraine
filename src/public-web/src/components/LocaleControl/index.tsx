import React from 'react';
import { Button, SegmentedControlProps, Menu} from '@mantine/core';
import { Locale } from '../../locale/type';
import { useLocale } from '../../locale/LocaleProvider';



export const LocaleControl: React.FC<Pick<SegmentedControlProps, 'fullWidth' | 'className'>> = () => {
  const { locale, changeLocale } = useLocale();
  
  const control =   <Button size="md" radius="xl" variant="white" uppercase>{locale}</Button>

  return (
    <Menu control={control}>
      <Menu.Item onClick={() =>changeLocale(Locale.En)}>English</Menu.Item>
      <Menu.Item onClick={() =>changeLocale(Locale.Uk)}>Ukrainian</Menu.Item>
    </Menu>
  );

}
