import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      shouldShowElem: false,
      userNumber: '',
      result: `Загадайте число`,
      count: 0,
      randomNumber:
      Math.floor((Math.random() * this.props.max - this.props.min) +
       this.props.min),
    };
  }

  btnShow() {
    this.setState({
      shouldShowElem: true,
    });
  }
  playAgain = () => {
    this.setState({
      value: '',
      shouldShowElem: false,
      userNumber: '',
      result: `Загадайте число`,
      count: 0,
      randomNumber:
      Math.floor((Math.random() * this.props.max - this.props.min) +
       this.props.min),
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    e.target.value = '';
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }
      this.btnShow();
      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
      };
    });
  };

  handleClear = e => {
    this.setState(state => (
      {
        value: '',
      }
    ));
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState((state, props) => ({
      userNumber: e.target.value,
      value: e.target.value,
    }));
  };
  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value = {this.state.value}/>
          <button className={style.btn}
            onClick={this.handleClear}>Угадать</button>
          {this.state.shouldShowElem &&
              <button className={style.btn}
                onClick={this.playAgain} >Сыграть еще раз</button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
