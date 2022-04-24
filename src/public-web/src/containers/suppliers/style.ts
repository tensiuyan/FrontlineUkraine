import { createStyles } from '@mantine/styles';
import { tablet } from '../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  gridContainer: {
    height: '100%',
  },
  feedContentContainer: {
    maxHeight: '100%',
    overflowY: 'scroll',
  },
  mapContainer: {
    minHeight: 320,
    [tablet(theme)]: {
      minHeight: '100%',
    },
  },
  ourVoiceTimeline: {
    padding: `${theme.spacing.sm}px`,
    display: 'block',
    [tablet(theme)]: {
      display: 'none',
    },
  },
  stackContainer: {
    margin: '0',
    height: '100%',
  },
  noSessionContent: {
    backgroundColor: theme.white,
    minHeight: '100vh'
  },
  sPdescription : {
    textAlign: 'center',
  },
  sPheading: {
    margin: 0,
    marginTop: 20
  }
}));
