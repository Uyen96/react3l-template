import React, { RefObject } from 'react';
import './AdvanceStringFilter.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

interface AdvanceStringFilter<T extends Model> {
  value?: string;                                                                      
  isMaterial?: boolean;
  title?: string;
  isError?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
}

function AdvanceStringFilter(props: AdvanceStringFilter<Model>) {
  const {
    value,
    title,
    disabled,
    placeHolder,
    onChange,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>('');

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
    if (typeof onChange === 'function') {
      onChange(event.target.value);
    }
  }, [onChange]);

  const handleClearInput = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setInternalValue('');
    if (typeof onChange === 'function') {
      onChange(null);
    }
    inputRef.current.focus();
  }, [onChange]);

  React.useEffect(() => {
    if (value) {
      if (value !== internalValue) {
        setInternalValue(value);
      }
    } else {
      setInternalValue('');
    }
  }, [value]);

  return (
    <>
      <div className="advance-string-filter__container">
        { title && 
          <div className="advance-string-filter__title">{title}</div>
        }
        <div className="advance-string-filter__wrapper">
          <input type="text"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeHolder ? placeHolder : 'Nhập dữ liệu...'}
            ref={inputRef}
            disabled={disabled} 
            className={classNames('component__input')}/>
          { internalValue && <i className="advance-string-filter__icon tio-clear" onClick={handleClearInput}></i>}
        </div>
      </div>
    </>
  );
}

AdvanceStringFilter.defaultProps = {
  disabled: false,
};

export default AdvanceStringFilter;