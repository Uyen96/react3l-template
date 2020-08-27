import React from 'react';
import DateRange from './DateRange';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Moment } from 'moment';

export function DateRangeStories() {
    const [isMaterial, setIsMaterial] = React.useState(false);
    
    const [value, setValue] = React.useState<[Moment, Moment]>([null, null]);

    const [isTitle, setIsTitle] = React.useState(false);

    const [title, setTitle] = React.useState('');

    const handleChange = React.useCallback((dateMoment, dateString) => {
      setValue(dateMoment);
    }, []);

    const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
      setIsMaterial(event.target.value);
    }, []);

    const handleChangeTitle = React.useCallback((event: RadioChangeEvent) => {
      setIsTitle(event.target.value);
      if (event.target.value) {
          setTitle('Input text');
      } else setTitle('');
    }, []);

    return <div style={{margin: '10px', width: '250px'}}>
      <DateRange isMaterial={isMaterial}
        onChange={handleChange}
        title={title}
        value={value}/>

      <div style={{margin: '10px', width: '300px'}}>
        <DateRange isMaterial={isMaterial}
          onChange={handleChange}
          title={title}
          error={'Field required!'}
          value={value}/>
      </div>

      <div style={{margin: '10px', width: '300px'}}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
            <Radio value={true}>Material Style</Radio>
            <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>

      <div style={{margin: '10px', width: '300px'}}>
          <Radio.Group onChange={handleChangeTitle} value={isTitle}>
              <Radio value={true}>Titled</Radio>
              <Radio value={false}>Untitled</Radio>
          </Radio.Group>
        </div>
    </div>;
}