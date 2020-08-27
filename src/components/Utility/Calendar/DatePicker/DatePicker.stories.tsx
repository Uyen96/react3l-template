import React from 'react';
import DatePicker from './DatePicker';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Moment } from 'moment';

export function DatePickerStories() {
    const [isMaterial, setIsMaterial] = React.useState(false);
    
    const [value, setValue] = React.useState<Moment>();

    const handleChange = React.useCallback((dateMoment, dateString) => {
      setValue(dateMoment);
    }, []);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
      setIsMaterial(event.target.value);
    }, []);

    return <div style={{margin: '10px', width: '220px'}}>
      <DatePicker isMaterial={isMaterial}
        onChange={handleChange}
        value={value}/>
      <div style={{margin: '10px', width: '300px'}}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
            <Radio value={true}>Material Style</Radio>
            <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </div>;
}