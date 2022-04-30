import { createStyles } from '@mantine/styles';
import { getThemePrimaryColor } from '../../utils/mantine';

export const useStyles = createStyles((theme) => ({
  scrollContainer: {
    backgroundColor: theme.white,
    height: '100%',
    overflowY: 'scroll',
  },
  header: {
    color: getThemePrimaryColor(theme),
  },
  section: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing.xl,
    },
    'span': {
      fontWeight: 'bold'
    }
  },
  legend: {
    color: getThemePrimaryColor(theme),
    fontSize: theme.fontSizes.lg,
  },
  fieldSet: {
    borderRightStyle: 'none',
    borderLeftStyle: 'none',
    borderBottomStyle: 'none',
    marginBottom: theme.spacing.md,
  },
  inputWrapper: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  switchInput: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  submitBtn: {
    marginBottom: theme.spacing.md,
  },
}));
