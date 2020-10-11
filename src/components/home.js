import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { getData } from "../apis/home";
import "./home.scss";

class Home extends React.Component {
  state = {
    spaceData: [],
    yearList: [
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ],
    launch_year: null,
    launch_success: null,
    land_success: null,
  };

  componentDidMount() {
    let req = "limit=100";
    this.getSpaceData(req);
  }

  getSpaceData(request) {
    getData(request).then((res) => {
      if (!res["isAxiosError"]) {
        // let yearList = [
        //   ...new Set(res.map(({ launch_year }) => launch_year)),
        // ].sort();
        this.setState({
          spaceData: res,
          //   yearList,
        });
      }
    });
  }

  handleFilterChange(type, e, value) {
    const { launch_year, land_success, launch_success } = this.state;
    let req = "";
    if (type === "launch_year") {
      if (value !== null) req = `&${[type]}=${value}`;
      if (land_success !== null) req += "&land_success=" + land_success;
      if (launch_success !== null) req += "&launch_success=" + launch_success;
    } else if (type === "land_success") {
      if (value !== null) req = `&${[type]}=${value}`;
      if (launch_success !== null) req += "&launch_success=" + launch_success;
      if (launch_year !== null) req += "&launch_year=" + launch_year;
    } else if (type === "launch_success") {
      if (value !== null) req = `&${[type]}=${value}`;
      if (land_success !== null) req += "&land_success=" + land_success;
      if (launch_year !== null) req += "&launch_year=" + launch_year;
    }
    this.getSpaceData(req);
    this.setState({
      [type]: value,
    });
  }
  render() {
    const {
      launch_year,
      launch_success,
      land_success,
      spaceData,
      yearList,
    } = this.state;
    return (
      <div className="home-container">
        <h2>SpaceEx Launch rograms</h2>
        <Grid container>
          <Grid item xs={12} lg={2}>
            <Paper className="filter-wrapper">
              <h6 className="font-heading">Filters</h6>

              <div className="toggle-wrapper">
                <p className="filter-heading">Launch Year </p>
                <hr />
                <ToggleButtonGroup
                  exclusive
                  value={launch_year}
                  onChange={this.handleFilterChange.bind(this, "launch_year")}
                  aria-label="text formatting"
                >
                  {yearList.length > 0 &&
                    yearList.map((item, index) => (
                      <ToggleButton key={index} value={item} aria-label="bold">
                        {item}
                      </ToggleButton>
                    ))}
                </ToggleButtonGroup>
              </div>
              <div className="toggle-wrapper">
                <p className="filter-heading">Successful Launch</p>
                <hr />
                <ToggleButtonGroup
                  exclusive
                  value={launch_success}
                  onChange={this.handleFilterChange.bind(
                    this,
                    "launch_success"
                  )}
                  aria-label="text formatting"
                >
                  <ToggleButton value={true} aria-label="bold">
                    True
                  </ToggleButton>
                  <ToggleButton value={false} aria-label="bold">
                    False
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="toggle-wrapper">
                <p className="filter-heading">Successful Landing</p>
                <hr />
                <ToggleButtonGroup
                  exclusive
                  value={land_success}
                  onChange={this.handleFilterChange.bind(this, "land_success")}
                  aria-label="text formatting"
                >
                  {" "}
                  <ToggleButton value={true} aria-label="bold">
                    True
                  </ToggleButton>
                  <ToggleButton value={false} aria-label="bold">
                    False
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={10}>
            <Grid container>
              {spaceData.length > 0 &&
                spaceData.map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    style={{ padding: "10px" }}
                  >
                    <Paper className="grid-wrapper">
                      <div className="grid-sub-wrapper">
                        <img
                          srcSet={`${item["links"]["mission_patch"]} 1200w`}
                          src={item["links"]["mission_patch_small"]}
                          alt={item["mission_name"] + "Logo"}
                        />
                        <a
                          className="font-heading"
                          href="https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html"
                          target="_blank"
                        >
                          {item["mission_name"]} #{item["flight_number"]}{" "}
                        </a>
                        <h6 className="font-heading">Mission Ids:</h6>
                        <ul>
                          {item.mission_id.length > 0 &&
                            item.mission_id.map((missionItem, missionIndex) => (
                              <li className="value-text" key={missionIndex}>
                                {missionItem}
                              </li>
                            ))}
                        </ul>
                        <h6 className="font-heading">
                          Launch Year:{" "}
                          <span className="value-text">
                            {item["launch_year"]}
                          </span>
                        </h6>
                        <h6 className="font-heading">
                          Successful Launch :{" "}
                          <span className="value-text">
                            {"" + item["launch_success"] + ""}
                          </span>
                        </h6>
                        <h6 className="font-heading">
                          Successful Landing:{" "}
                          <span className="value-text">
                            {"" + item["is_tentative"] + ""}
                          </span>
                        </h6>
                      </div>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <h5 className="developer-name">Developed By: Thilak Raj </h5>
      </div>
    );
  }
}
export default Home;
