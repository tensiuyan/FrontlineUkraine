import React, { useCallback } from 'react';
import cx from 'classnames';
import authgear from '@authgear/web';
import { FormattedMessage } from '@oursky/react-messageformat';
import { Map } from '../landing/components/Map';
import { Col, Grid, Text, Button, Stack } from '@mantine/core';
import { FeedContent } from '../landing/components/FeedContent';
import { OurVoicesTimeline } from '../landing/components/OurVoicesTimeline';
import { useSessionState } from '../../contexts/AuthgearContext';
import { useStyles } from './style';

export const Suppliers: React.FC = () => {
  const sessionState = useSessionState();

  const onClickSignIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const redirectURI = `${window.location.origin}/authgear`;
    authgear
      .startAuthorization({
        redirectURI,
        prompt: 'login',
        state: btoa(
          window.location.pathname +
            window.location.search +
            window.location.hash
        ),
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const { classes } = useStyles();

  if (sessionState === 'AUTHENTICATED') {
    return (
      <Grid className={classes.gridContainer} gutter={0}>
        <Col className={classes.feedContentContainer} span={12} md={4}>
          <FeedContent />
        </Col>
        <Col className={classes.mapContainer} span={12} md={8}>
          <Map />
        </Col>
        <Col span={12}>
          <OurVoicesTimeline className={classes.ourVoiceTimeline} />
        </Col>
      </Grid>
    );
  }

  if (sessionState === 'NO_SESSION') {
    return (
      <Grid className={cx(classes.stackContainer, classes.noSessionContent)}>
        <Col md={12} lg={4} offsetLg={4}>
          <Stack
            align="center"
            className={classes.stackContainer}
          >
            <h1 className={classes.sPheading}>Supplier Portal</h1>
            <Text className={classes.sPdescription}>
              If you are a verified supplier, please login to see the full map.<br />
              If you wish to sign up as an verified supplier, please contact <a href="mailto:hello@frontline.live">hello@frontline.live</a> 
            </Text>
            <Button onClick={onClickSignIn}>
              <FormattedMessage id="suppliers_sign_in_button" />
            </Button>
          </Stack>
        </Col>
      </Grid>
    );
  }

  return null;
};
