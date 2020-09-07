import React from "react";
import { Card, Col, Row, Switch, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import InputText from "components/Utility/Input/InputText/InputText";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import Select from "components/Utility/Select/Select";
import { OrganizationFilter } from "models/OrganizationFilter";
import { PriceList } from "models/PriceList";
import { SalesOrderTypeFilter } from "models/PriceList/SalesOrderTypeFilter";
import { priceListRepository } from "repositories/price-list-repository";
import detailService from "services/pages/detail-service";
import PriceListStoreMappingsTable from "../PriceListDetailView/ContentTable/PriceListStoreMappingTable";

const { TabPane } = Tabs;

function PriceListDetailView() {
  const [translate] = useTranslation();
  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
    // handleSave
  } = detailService.useDetail<PriceList>(PriceList, priceListRepository.get);

  const {
    content: storeMappingContents,
    setContent: setStoreMappingContents,
  } = detailService.useContentList(
    model,
    handleUpdateNewModel,
    nameof(model.priceListStoreMappings),
  );

  return (
    <div className='page page__detail'>
      {/* start detail header */}
      <div className='page__header d-flex align-items-center '>
        <div className='page__title mr-1'>
          {translate("paymentRequest.detail.title")}
        </div>
        {isDetail ? (
          <div className='page__id'>{`- # ${model.id}`}</div>
        ) : (
          translate("general.actions.create")
        )}
      </div>
      {/* end detail header */}
      {/* start general information */}
      <div className='w-100 mt-3 page__detail-tabs'>
        <Row className='d-flex'>
          <Col lg={18}>
            <Card className='mr-3'>
              <Tabs defaultActiveKey='1'>
                <TabPane
                  tab={translate("general.detail.generalInfomation")}
                  key='1'
                >
                  <Row>
                    <Col lg={6} className='pr-3'>
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        title={translate("priceList.code")}
                        placeHolder={translate("priceList.placeholder.code")}
                        className={"tio-account_square_outlined"}
                        onChange={handleChangeSimpleField(nameof(model.code))}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        title={translate("priceList.name")}
                        placeHolder={translate("priceList.placeholder.name")}
                        className={"tio-account_square_outlined"}
                        onChange={handleChangeSimpleField(nameof(model.name))}
                      />
                    </Col>
                    <Col lg={6} className='pr-3'>
                      <TreeSelect
                        isMaterial={true}
                        placeHolder={"Select Organization"}
                        selectable={true}
                        classFilter={OrganizationFilter}
                        // onChange={handleChangeItem}
                        checkStrictly={true}
                        // item={item}
                        // listItem={listItem}
                        getTreeData={priceListRepository.singleListOrganization}
                      />
                    </Col>
                    <Col lg={6}>
                      <Select
                        title={translate("priceList.saleOrderType")}
                        classFilter={SalesOrderTypeFilter}
                        placeHolder={translate(
                          "priceList.placeholder.saleOrderType",
                        )}
                        isMaterial={true}
                      />
                    </Col>
                  </Row>
                  <Row className='mt-3'>
                    <Col lg={6}>
                      <DatePicker
                        title={translate("priceList.startDate")}
                        value={model.startDate}
                        isMaterial={true}
                        placeholder={translate(
                          "priceList.placeholder.startDate",
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <DatePicker
                        title={translate("priceList.endDate")}
                        value={model.endDate}
                        isMaterial={true}
                        placeholder={translate("priceList.placeholder.endDate")}
                      />
                    </Col>
                    <Col lg={6}>
                      {/*  */}
                      <label className='label-detail input-select__title'>
                        {translate("priceList.organzation")}
                      </label>
                      <Switch
                        size='small'
                        onChange={handleChangeSimpleField(
                          nameof(model.statusId),
                        )}
                        defaultChecked={model.statusId === 1 ? true : false}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
      {/* end general information */}
      {/* start dependent lists*/}
      <div className='w-100 mt-3 page__detail-tabs'>
        <Row className='d-flex'>
          <Col lg={18}>
            <Card className='mr-3'>
              <Tabs defaultActiveKey='1'>
                <TabPane
                  tab={translate("priceList.priceListStoreMappings")}
                  key='1'
                >
                  <Row>
                    <PriceListStoreMappingsTable
                      content={storeMappingContents}
                      setContent={setStoreMappingContents}
                      mapperField={nameof(model.priceListStoreMappings)}
                    />
                  </Row>
                </TabPane>
                <TabPane
                  tab={translate("priceList.priceListItemMappings")}
                  key='2'
                >
                  <Row></Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        {/* end dependent lists */}
        {/* start save action */}
        <Row className='mt-3 mb-5'>
          <button className='btn component__btn-primary pr-4 mb-5'>
            {translate("general.actions.search")}
          </button>
        </Row>
        {/* end save action */}
      </div>
    </div>
  );
}

export default PriceListDetailView;

// const priceListStoreMappingsColumnData: ColumnData[] = useMemo(
//   () => [
//     {
//       title: translate("general.columns.index"),
//       children: [
//         {
//           title: "",
//           key: "index",
//         },
//       ],
//     },
//     {
//       title: translate("priceLists.store.code"),
//       children: [
//         {
//           renderTitle: advanceFilterFactory.renderStringFilter(
//             filter["storeCode"]["contain"],
//             handleFilter("storeCode", "contain"),
//             translate("priceLists.store.code"),
//           ),
//           key: "name",
//           dataIndex: "store",
//         },
//       ],
//     },
//   ],
//   [filter, handleFilter, translate],
// );
