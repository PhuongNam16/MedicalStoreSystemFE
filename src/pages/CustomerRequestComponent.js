import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class CustomerRequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.completeCustomerRequestDetails =
      this.completeCustomerRequestDetails.bind(this);
    this.formRef = React.createRef();
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    customerRequestDataList: [],
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCustomerRequestData(
      event.target.name.value,
      event.target.phone.value,
      event.target.medicine_details.value,
      event.target.prescription.files[0]
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.fetchCustomerRequestData();
    this.formRef.current.reset();
  }

  //This Method Work When Our Page is Ready
  componentDidMount() {
    this.fetchCustomerRequestData();
  }

  async fetchCustomerRequestData() {
    var apihandler = new APIHandler();
    var customerRequestData = await apihandler.fetchAllCustomerRequest();
    console.log(customerRequestData);
    this.setState({ customerRequestDataList: customerRequestData.data.data });
    this.setState({ dataLoaded: true });
  }

  async completeCustomerRequestDetails(
    customer_id,
    name,
    phone,
    medicine_details
  ) {
    console.log(customer_id);
    var apihandler = new APIHandler();
    var customerRequestData = await apihandler.updateCustomerRequest(
      customer_id,
      name,
      phone,
      medicine_details
    );
    console.log(customerRequestData);
    this.fetchCustomerRequestData();
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>QU???N L?? Y??U C???U THU???C C???A KH??CH H??NG</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Th??m y??u c???u kh??ch h??ng</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="email_address">T??n kh??ch h??ng</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="T??n kh??ch h??ng"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">??i???n tho???i</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="??i???n tho???i"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Chi ti???t thu???c</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Chi ti???t thu???c"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">????n thu???c</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="file"
                          id="prescription"
                          name="prescription"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Th??m y??u c???u"
                        : "??ang th??m, vui l??ng ?????i..."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Th??nh c??ng!</strong>
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Th???t b???i!</strong>
                        {/* {this.state.errorMessage}. */}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded == false ? (
                    <div className="text-center">
                      <div className="preloader pl-size-xl">
                        <div className="spinner-layer">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>T???t c??? Y??u c???u c???a Kh??ch h??ng</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>T??n kh??ch h??ng</th>
                        <th>??i???n tho???i</th>
                        <th>Chi ti???t thu???c</th>
                        <th>????n thu???c</th>
                        <th>Tr???ng th??i</th>
                        <th>???? th??m v??o</th>
                        <th>Ho???t ?????ng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.customerRequestDataList.map(
                        (CustomerRequest) => (
                          <tr key={CustomerRequest.id}>
                            <td>{CustomerRequest.id}</td>
                            <td>{CustomerRequest.customer_name}</td>
                            <td>{CustomerRequest.phone}</td>
                            <td>{CustomerRequest.medicine_details}</td>
                            <td>
                              {CustomerRequest.prescription == null ? (
                                ""
                              ) : (
                                <img
                                  src={CustomerRequest.prescription}
                                  style={{ width: 100, height: 100 }}
                                />
                              )}
                            </td>
                            <td>
                              {CustomerRequest.status == 0
                                ? "Ch??a gi???i quy???t"
                                : "Ho??n th??nh"}
                            </td>
                            <td>
                              {new Date(
                                CustomerRequest.added_on
                              ).toLocaleString()}
                            </td>
                            <td>
                              {CustomerRequest.status == 0 ? (
                                <button
                                  className="btn btn-block btn-warning"
                                  onClick={() =>
                                    this.completeCustomerRequestDetails(
                                      CustomerRequest.id,
                                      CustomerRequest.customer_name,
                                      CustomerRequest.phone,
                                      CustomerRequest.medicine_details
                                    )
                                  }
                                >
                                  Ho??n t???t?
                                </button>
                              ) : (
                                <button className="btn btn-block btn-success">
                                  Ho??n th??nh
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CustomerRequestComponent;
