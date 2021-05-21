import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Forminput from './Forminput'

const BmiCalculator = props => {
    const {getBmiValue} = props;

    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [unit, setUnit] = useState('Metric');
    const [count, setCount] = useState({
        heightCount: '0',
        inchesCount: '0',
        weightCount: '0'
    });

    const {heightCount, inchesCount, weightCount} = count;

    useEffect(() => {
        metricBMI(heightCount, weightCount);
        imperialBMI(heightCount, weightCount, inchesCount)

        // eslint-disable-next-line
    }, [heightCount, weightCount, inchesCount]);

    const onChangeInput = e => {
        const {name, value} = e.target;
        setCount(prevState => ({...prevState, [name]: value}));
    }

    const onSelectTag = e => {
        setUnit(e.target.value);
        if(e.target.value === 'Metric'){
            setHeightUnit('cm');
            setWeightUnit('kg');
        }else{
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    }

    const metricBMI = (height, weight) => {
        if(height > 0 && weight > 0){
            const cmToMeter = height / 100;
            const bmi = weight / (Math.pow(cmToMeter,2));
            getBmiValue(Math.round(bmi));
        }
    }

    const imperialBMI = (height, weight, inches) => {
        if(height > 0 && weight > 0 && inches > 0){
            const heightToInches = (height * 12) + parseInt(inches);
            const bmi = 703 * (weight / (Math.pow(heightToInches,2)));
            getBmiValue(Math.round(bmi));
        }
    }


    const resetData = e => {
        e.preventDefault();

        getBmiValue(0);
        setUnit('Metric');
        setCount({
            heightCount: '0',
            inchesCount: '0',
            weightCount: '0'
        });
        setWeightUnit('cm');
        setHeightUnit('kg');
    }

    return (
        <>
          <div className="bmi-inputs">
              <div className="inputs-fields">
                  <div>
                      <span className="label-unit">Unit</span>
                      <div className="unit">
                          <select
                              name="unit"
                              value={unit}
                              onChange={onSelectTag}
                              className="form-control form-control-sm"
                          >
                              <option value="Metric">Metric</option>
                              <option value="Imperial">Imperial</option>
                          </select>
                      </div>
                  </div>
                  <Forminput
                    type="text"
                    name="heightCount"
                    title={`Height (${heightUnit})`}
                    value={heightCount}
                    onChange={onChangeInput}
                  />
                  {
                      unit === 'Imperial' ? 
                      <Forminput
                        type="text"
                        name="inchesCount"
                        title={`(in)`}
                        value={inchesCount}
                        onChange={onChangeInput}
                      />
                      : ''
                  }
                  <Forminput
                    type="text"
                    name="weightCount"
                    title={`Weight (${weightUnit})`}
                    value={weightCount}
                    onChange={onChangeInput}
                  />
              </div>
              <button className="button" type="submit" onClick={resetData}>
                  Reset
              </button>
          </div>  
        </>
    )
}

BmiCalculator.propTypes = {
    getBmiValue: PropTypes.func.isRequired
}

export default BmiCalculator
