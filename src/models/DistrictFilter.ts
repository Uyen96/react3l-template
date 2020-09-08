import { ModelFilter } from "@react3l/react3l/core";
import { IdFilter } from "@react3l/advanced-filters/IdFilter";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";

export class DistrictFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public code?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public englishName?: StringFilter = new StringFilter();

  public administrativeTypeId?: IdFilter = new IdFilter();

  public provinceId?: IdFilter = new IdFilter();
}
