import {ModelFilter} from 'react3l/core';
import {IdFilter} from 'react3l-advanced-filters/IdFilter';
import {StringFilter} from 'react3l-advanced-filters/StringFilter';
import {DateFilter} from 'react3l-advanced-filters/DateFilter';

export class UserFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public email?: StringFilter = new StringFilter();

  public birthday?: DateFilter = new DateFilter();

  public firstName?: StringFilter = new StringFilter();

  public lastName?: StringFilter = new StringFilter();

  public provinceId?: IdFilter = new IdFilter();

  public districtId?: IdFilter = new IdFilter();
}
