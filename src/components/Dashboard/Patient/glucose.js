import React, { Component } from 'react';
import Line from '../../charts/line';
import Pagination from 'react-js-pagination';

class Glucose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glucoseJson: '{}',
      dataArr: '[]',
      datesArr: '[]',
      glucoseTableBodyHtml: '[]',
      dataHtmlArr: '[]'
    };
    this.serverUrl = "http://35.161.81.114:9000";
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount = function() {
    this.getGlucose();
  }

  getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  makeGetRequest(url, callback) {
    url = url + '?patientId=' + this.getUrlParameter("id");
    var request = new Request(url, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request).then(function(response) {
      return response.json();
    }).then(function(j) {
      callback(j);
    });
  }

  ConvertNumberToTwoDigitString = function(n) {
      return n > 9 ? "" + n : "0" + n;
  }

  custom_sort = function(a, b) {
   return a.getTime() - b.getTime();
  }

  getGlucose = function() {
    this.makeGetRequest(this.serverUrl+'/patient/glucose', function(json){
      var datesArr = [],
      dataArr = [],
      avg, tableRows = [], time,
      dict = {},
      glucoseArr = [];

      for(var i in json.glucose) {
        var data = json.glucose[i];
        var date = new Date(data["date"]),
        dateString = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear(),
        obj = {
          time: date.toTimeString(),
          data: data.data
        };

        if (dict[dateString] == undefined) {
          datesArr.push(date);
          dict[dateString] = {
            glucose: [obj],
          };
        } else {
          dict[dateString].glucose.push(obj);
        }
      }

      var sortedDatesArr = datesArr.sort(this.custom_sort),
      stringArr = [],
      dataHtmlArr = [];

      for(var i in sortedDatesArr) {
        var date = sortedDatesArr[i];
        var index = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear(),
        pArray = [];
        stringArr.push(index);
        var avgG = 0,
        g = dict[index].glucose;

        for(var i in g) {
          avgG = avgG + parseInt(g[i].data);
          pArray.push(
            (
              <p>{g[i].time}: {g[i].data}</p>
            )
          );
        }

        glucoseArr.push(avgG/g.length);
        dataHtmlArr.push(pArray);
      }

      this.setState({dataArr:glucoseArr});
      this.setState({datesArr:stringArr});
      this.setState({dataHtmlArr:dataHtmlArr});
      this.handlePageChange(1);
    }.bind(this));
  }

  displayTable = function(start, end) {
    var tableRows = [],
    stringArr = this.state.datesArr,
    dataHtmlArr = this.state.dataHtmlArr;

    for (var j=start;j<end;j++) {
      tableRows.push(
        (
        <tr>
          <td>{parseInt(j)+1}</td>
          <td>{stringArr[j]}</td>
          <td>{dataHtmlArr[j]}</td>
        </tr>
      ));
    }

    var glucoseTableBodyHtml = (
      <tbody>
        {tableRows}
      </tbody>
    );

    this.setState({glucoseTableBodyHtml:glucoseTableBodyHtml});
  }

  handlePageChange(pageNumber) {
    var start = 10*(pageNumber-1),
    end = start + 10;
    if(this.state.datesArr.length < end) {
      end = this.state.datesArr.length;
    }
    this.displayTable(start, end);
    this.setState({activePage: pageNumber});
  }

  render() {
    return (
      <div>
        <div className="widget-items">
          <Line data={this.state.dataArr} categories={this.state.datesArr}/>
        </div>
        <div className="widget-items">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Glucose</th>
              </tr>
            </thead>
            {this.state.glucoseTableBodyHtml}
          </table>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.datesArr.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Glucose;
