import React, { RefObject } from 'react';
import './InputText.scss';
import { Model } from 'react3l/core/model';
import classNames from 'classnames';

interface InputText<T extends Model> {
  value?: string;                                                                      
  isMaterial?: boolean;
  title?: string;
  error?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
}

function InputText(props: InputText<Model>) {
  const {
    value,
    isMaterial,
    title,
    error,
    disabled,
    placeHolder,
    className,
    onChange,
  } = props;

  const isError = React.useMemo(() => {
    return error ? true : false;
  }, [error]);

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
      setInternalValue(value);
    } else {
      setInternalValue('');
    }
  }, [value]);

  return (
    <>
      <div className="input-text__container">
        { title && 
          <div className={classNames('input-text__title', {'error-text': isError})}>{title}</div>
        }
        <div className="input-text__wrapper">
          <input type="text"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeHolder ? placeHolder : 'Nhập dữ liệu...'}
            ref={inputRef}
            disabled={disabled} 
            className={classNames('component__input', 
            {'component__input--material': isMaterial, 'component__input--bordered': !isMaterial, 'error-border': isError})}/>
          { internalValue ? 
            <i className="input-text__icon tio-clear" onClick={handleClearInput}></i> :
            className && 
            <i className={classNames('input-text__icon', className , {'error-text': isError})}></i>
          }
        </div>
        {isError && <span className="error-text error-message">{error}</span>}
      </div>
    </>
  );
}

InputText.defaultProps = {
  isMaterial: false,
  disabled: false,
  className: '',
};

export default InputText;
