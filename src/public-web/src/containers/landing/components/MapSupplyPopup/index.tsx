import React, { useMemo } from 'react';
import { PpeTypeEnumLabel } from '../PpeTypeEnumLabel';
import { getPpeTypeEnumFromInt, PpeTypeEnum } from '../../../../models/ppeType';
import { useStyles } from './style';
import { Supply } from '../../../../models/supply';

interface Props {
  supply: Supply;
}

export const MapSupplyPopup: React.FC<Props> = ({ supply }) => {
  const { classes, cx } = useStyles();

  const otherTypePpeType = useMemo(() => {
    const otherTypePpeType = supply.ppeTypes.find(
      ({ ppeType }) => PpeTypeEnum.Other === getPpeTypeEnumFromInt(ppeType)
    );
    if (otherTypePpeType == null) {
      return null;
    }
    if (otherTypePpeType.ppeTypeOther == null) {
      return null;
    }
    return otherTypePpeType;
  }, [supply.ppeTypes]);
  const { datetime } = useMemo(
    () => ({
      datetime: new Date(supply.datetime),
    }),
    [supply]
  );
  return (
    <div className={cx(classes.container)}>
      <h1>Supplies Post</h1>
      <dl>
        <dt>Postcode:</dt>
        <dd>{supply.postcode}</dd>
        <dt>Organisation:</dt>
        <dd>
          {supply.website != null && supply.website.length !== 0 ? (
            <a href={supply.website}>{supply.organisation}</a>
          ) : (
            supply.organisation
          )}
        </dd>
        {supply.description && (
          <>
            <dt>Description:</dt>
            <dd>{supply.description}</dd>
          </>
        )}
        <dt>Supplies:</dt>
        <dd>
          <ul>
            {supply.ppeTypes.map(({ ppeType }) => (
              <li key={ppeType}>
                <PpeTypeEnumLabel
                  ppeType={getPpeTypeEnumFromInt(ppeType)!}
                  variant="compact"
                />
              </li>
            ))}
          </ul>
        </dd>
        {otherTypePpeType && (
          <>
            <dt>Other Supplies:</dt>
            <dd>{otherTypePpeType.ppeTypeOther}</dd>
          </>
        )}
        {supply.capacityNotes && (
          <>
            <dt>Capacity Notes:</dt>
            <dd>{supply.capacityNotes}</dd>
          </>
        )}
      </dl>
      <div
        className={classes.datetime}
        title={`Received ${datetime.toLocaleString()}`}
      >
        {datetime.toLocaleString()}
      </div>
    </div>
  );
};
