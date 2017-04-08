import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="col-md-10">
          <div className="row widget-items">
              <div className="col-md-4 steps">
                  <div className="widget">
                      <div className="panel-body center">
                          <h2 className="h1">5000 <span className="txt-small">Steps</span></h2>
                          <div className="c100 big p50">
                              <span><img src="/images/icons/icon-steps.png" className="icon"/></span>
                              <div className="slice">
                                  <div className="bar"></div>
                                  <div className="fill"></div>
                              </div>
                          </div>
                          <p>To reach Goal - 5000 steps</p>
                          <p>Miles: 500</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-4 calories">
                  <div className="widget">
                      <div className="panel-body center">
                          <h2 className="h1">300 <span className="txt-small">Kcal Burned</span></h2>
                          <div className="c100 big p50 orange">
                              <span><img src="/images/icons/icon-calories.png" className="icon"/></span>
                              <div className="slice">
                                  <div className="bar"></div>
                                  <div className="fill"></div>
                              </div>
                          </div>
                          <p>To reach Goal - 5000 steps</p>
                          <p>Miles: 500</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-4 food-intake">
                  <div className="widget">
                      <div className="panel-body center">
                          <h2 className="h1">1300 <span className="txt-small">Kcal Intake</span></h2>
                          <div className="c100 big p50 green">
                              <span><img src="/images/icons/icon-food.png" className="icon"/></span>
                              <div className="slice">
                                  <div className="bar"></div>
                                  <div className="fill"></div>
                              </div>
                          </div>
                          <p>To reach Goal - 5000 steps</p>
                          <p>Miles: 500</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-4 blood-Glucose">
                  <div className="widget">
                      <div className="panel-body center">
                          <h2 className="h1">6.2 <span className="txt-small">mg/dl</span></h2>
                          <img src="/images/icons/icon-glucose.png" className="icon big"/>
                      </div>
                  </div>
              </div>
              <div className="col-md-4 weight">
                  <div className="widget">
                      <div className="panel-body center">
                          <h2 className="h1">75 <span className="txt-small">lbs</span></h2>
                          <img src="/images/icons/icon-weight.png" className="icon"/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default Home;
