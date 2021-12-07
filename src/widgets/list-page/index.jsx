import React from 'react';
import {
  Row, Col, Form, Input, Select,
} from 'antd';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
// import styles from 'pages/loc-dev/create-page/create-page-style.less';

const SortableItem = sortableElement(({ children }) => children);

const SortableContainer = sortableContainer(({ children }) => <div>{children}</div>);

const FormItem = Form.Item;
const tableFieldLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ getFieldsValue, setFieldsValue, getFieldValue }) {
  return (
    <>
      <div >操作按钮(Action bar)</div>
      <Row>
        <Form.List name="action_bars">
          {
            (fields, { add, remove }) => (
              <>
                {
                  fields.map((field, index) => (
                    <Col span={11} style={{ display: 'flex' }}>
                      <FormItem name={[field.name, 'label']} label="按钮名" {...tableFieldLayout}>
                        <Input placeholder="label" />
                      </FormItem>
                      <FormItem name={[field.name, 'btnCode']} label="权限标识" {...tableFieldLayout}>
                        <Input placeholder="btnCode, 如user:add" />
                      </FormItem>
                    </Col>
                  ))
                }
                <PlusCircleOutlined
                  style={{ fontSize: '16px', margin: '10px' }}
                  onClick={() => add()}
                />
              </>
            )
          }
        </Form.List>
      </Row>
      <div >搜索区域</div>
      <Form.List name="search_bar_fields">
        {
          (fields, { add, remove }) => (
            <SortableContainer
              onSortEnd={({ oldIndex, newIndex }) => {
                const searchBarFields = getFieldValue('search_bar_fields');
                setFieldsValue({
                  search_bar_fields: arrayMoveImmutable(searchBarFields, oldIndex, newIndex),
                });
              }}
              distance={3}
            >
              {
                fields.map((field, index) => (
                  <SortableItem
                    key={field.fieldKey}
                    index={index}
                  >
                    <Row style={{ with: '100%' }}>
                      <FormItem name={[field.name, 'zh_name']} label="参数中文名">
                        <Input />
                      </FormItem>
                      <FormItem name={[field.name, 'en_name']} label="参数名">
                        <Input />
                      </FormItem>
                      <FormItem name={[field.name, 'elem_type']} label="搜索框类型">
                        <Select
                          style={{ width: '100px' }}
                          options={[
                            { label: '下拉框', value: 'Select' },
                            { label: '文本框', value: 'Input' },
                            { label: '日期', value: 'SingleDate' },
                            { label: '日期范围', value: 'Date' }]}
                        > </Select>
                      </FormItem>
                      <FormItem shouldUpdate noStyle>
                        {(form) => {
                          const search_bar_fields = form.getFieldValue('search_bar_fields');
                          const { elem_type, option_type } = search_bar_fields[index];
                          if (elem_type === 'Date') {
                            return (
                              <FormItem name={[field.name, 'split_keys']} label="split_keys" stye={{ width: '200px' }}>
                                <Input placeholder="使用,分隔，如:startDate,endDate" />
                              </FormItem>
                            );
                          } if (elem_type === 'Select') {
                            return (
                              <>
                                <FormItem name={[field.name, 'option_type']} label="选项类型" initialValue="static_option">
                                  <Select options={[{ label: '接口获取', value: 'api_option' }, { label: '静态选项', value: 'static_option' }]} style={{ width: '100px' }} />
                                </FormItem>
                                <FormItem name={[field.name, 'cmpt_items']} label="选项内容" style={{ flex: 1 }}>
                                  {
                                    option_type === 'api_option'
                                      ? <Input placeholder="接口地址" />
                                      : <Input.TextArea placeholder="label1:value1, label2:value2, 如果label和value相同，可以简写为label1, label2" style={{ height: '32px' }} />
                                  }
                                </FormItem>
                              </>
                            );
                          }
                        }}
                      </FormItem>
                      <CloseCircleOutlined  onClick={() => remove(field.name)} />
                    </Row>
                  </SortableItem>
                ))
              }
            </SortableContainer>
          )
        }
      </Form.List>
      <div >表格列</div>
      <SortableContainer
        onSortEnd={({ oldIndex, newIndex }) => {
          const searchBarFields = getFieldValue('record_fields');
          setFieldsValue({
            record_fields: arrayMoveImmutable(searchBarFields, oldIndex, newIndex),
          });
        }}
        distance={3}
        axis="xy"
      >
        <Row>
          <Form.List name="record_fields" layout="horizontal">
            {
              (fields, { add, remove }) => fields.map((field, index) => (
                <>
                  <SortableItem key={field.fieldKey} index={index}>
                    <Col span={11} offset={index % 2 === 1 ? 1 : 0} style={{ display: 'flex' }}>
                      <FormItem label="中文列名" name={[field.name, 'zh_name']} {...tableFieldLayout}>
                        <Input />
                      </FormItem>
                      <FormItem label="英文列名" name={[field.name, 'en_name']} {...tableFieldLayout}>
                        <Input />
                      </FormItem>
                      <CloseCircleOutlined onClick={() => remove(field.name)} />
                    </Col>
                  </SortableItem>
                  {
                    index === fields.length - 1 && (
                      <Col span={11}>
                        <PlusCircleOutlined
                          style={{ fontSize: '16px', marginTop: '10px' }}
                          onClick={() => add()}
                        />
                      </Col>
                    )
                  }
                </>
              ))
            }
          </Form.List>
        </Row>
      </SortableContainer>
      <div >表格操作</div>
      <Form.List name="table_actions">
        {
          (fields, { add, remove }) => (
            <>
              {
                fields.map((field, index) => (
                  <Col span={24} style={{ display: 'flex' }}>
                    <FormItem name={[field.name, 'label']} label="按钮名" {...tableFieldLayout}>
                      <Input placeholder="label" style={{ width: '100px' }} />
                    </FormItem>
                    <FormItem name={[field.name, 'btnCode']} label="权限标识" {...tableFieldLayout}>
                      <Input placeholder="btnCode, 如user:add" />
                    </FormItem>
                    <FormItem name={[field.name, 'func_name']} label="func_name">
                      <Select
                        options={[
                          { label: 'onDelete', value: 'onDelete' },
                          { label: 'onEnable', value: 'onEnable' },
                          { label: 'onDisable', value: 'onDisable' },
                          { label: 'onOther', value: 'onOther' },
                        ]}
                        style={{ width: '100px' }}
                      />
                    </FormItem>
                    <FormItem label="接口" name={[field.name, 'action_api_url']}>
                      <Input placeholder="点击所调接口, 如果是链接则不需要" />
                    </FormItem>
                    <FormItem label="链接" name={[field.name, 'link_url']}>
                      <Input placeholder="静态url如/#/about或箭头函数: record => '/user/detail?userid=' + record.id" />
                    </FormItem>
                    <CloseCircleOutlined  onClick={() => remove(field.name)} />
                  </Col>
                ))
              }
              <PlusCircleOutlined
                style={{ fontSize: '16px' }}
                onClick={() => add()}
              />
            </>
          )
        }
      </Form.List>
    </>
  );
}
