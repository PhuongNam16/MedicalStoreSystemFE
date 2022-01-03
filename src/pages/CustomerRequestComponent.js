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
            <h2>QUẢN LÝ YÊU CẦU THUỐC CỦA KHÁCH HÀNG</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Thêm yêu cầu khách hàng</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="email_address">Tên khách hàng</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Tên khách hàng"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Điện thoại</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Điện thoại"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Chi tiết thuốc</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Chi tiết thuốc"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Đơn thuốc</label>
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
                        ? "Thêm yêu cầu"
                        : "Đang thêm, vui lòng đợi..."}
                    </button>
                    <br />
                    {this.state.errorRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Thành công!</strong>
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Thất bại!</strong>
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
                  <h2>Tất cả Yêu cầu của Khách hàng</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Tên khách hàng</th>
                        <th>Điện thoại</th>
                        <th>Chi tiết thuốc</th>
                        <th>Đơn thuốc</th>
                        <th>Trạng thái</th>
                        <th>Đã thêm vào</th>
                        <th>Hoạt động</th>
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
                                ? "Chưa giải quyết"
                                : "Hoàn thành"}
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
                                  Hoàn tất?
                                </button>
                              ) : (
                                <button className="btn btn-block btn-success">
                                  Hoàn thành
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
