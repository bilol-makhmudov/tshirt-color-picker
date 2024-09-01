import React,{useState} from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import TShirt from './assets/TShirt';
import './App.css'; 
import colorData from './assets/TShirt-Colors.json';

function ColorPicker(){
    const [color, setColor] = useState('#FFFFFF');

    const options = Object.entries(colorData).flatMap(([category, colors]) =>
        colors.map(color => ({
          value: `#${color.hex}`,
          label: `${color.name} (${category})`,
          category: category
        }))
      );

    function handleColorChange(event){
        setColor(event.target.value);
    }

    const handleColorOptionChange = (selectedOption) => {
        if (selectedOption) {
          setColor(selectedOption.value);
        }
      };

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.data.value,
          color: getContrastColor(state.data.value),
        }),
      };

      const getContrastColor = (hexColor) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
      };

    return (
        <div className="card container mt-4">
            <div className="card-img-top mt-4 svg-container">
            <TShirt color={color} />
            </div>

        <div className="card-body">
          <h5 className="card-title">T-Color Picker</h5>
          <p className="card-text">Selected Colors hex: {color}</p>
          
          <div className="row">
          <input className="col color-input" type="color" value={color} onChange={handleColorChange}></input>
            <Select
                className="col-sm-10"
                options={options}
                onChange={handleColorOptionChange}
                styles={customStyles}
                placeholder="Color..."
                />
          </div>
          

        </div>
      </div>
       );
}

export default ColorPicker