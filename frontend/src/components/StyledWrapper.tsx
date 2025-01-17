import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="container">
          <img src='/a_1_sunny.svg'></img>
        </div>
        <div className="card-header">
          <span>Messadine, Susah<br />Tunisia</span>
          <span>March 13</span>
        </div>
        <span className="temp">23°</span>
        <div className="temp-scale">
          <span>Celcius</span>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 350px;
    height: 235px;
    position: relative;
    padding: 25px;
    background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #FFFFFF;
    box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .container {
    width: 250px;
    height: 250px;
    position: absolute;
    right: -35px;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.7);
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-header span:first-child {
    word-break: break-all;
    font-weight: 800;
    font-size: 15px;
    line-height: 135%;
    color: rgba(87, 77, 51, 0.66);
  }

  .card-header span:last-child {
    font-weight: 700;
    font-size: 15px;
    line-height: 135%;
    color: rgba(87, 77, 51, 0.33);
  }

  .temp {
    position: absolute;
    left: 25px;
    bottom: 12px;
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: rgba(87, 77, 51, 1);
  }

  .temp-scale {
    width: 80px;
    height: 36px;
    position: absolute;
    right: 25px;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 9px;
  }

  .temp-scale span {
    font-weight: 700;
    font-size: 13px;
    line-height: 134.49%;
    color: rgba(87, 77, 51, 0.66);
  }`;

export default Card;
