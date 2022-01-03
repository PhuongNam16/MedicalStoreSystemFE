import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class CompanyAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyAccountdata: [],
    dataLoaded: false,
    companylist: [],
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCompanyTransactionData(
      event.target.company_id.value,
      event.target.transaction_type.value,
      event.target.transaction_amt.value,
      event.target.transaction_date.value,
      event.target.payment_mode.value
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.updateDataAgain();
  }

  //This Method Work When Our Page is Ready
  componentDidMount() {
    this.fetchCompanyAccountData();
  }

  async fetchCompanyAccountData() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchCompanyOnly();
    this.updateDataAgain();
    this.setState({ companylist: companydata.data });
    this.setState({ dataLoaded: true });
  }

  async updateDataAgain() {
    var apihandler = new APIHandler();
    var companyAccountdata = await apihandler.fetchAllCompanyAccount();
    this.setState({ companyAccountdata: companyAccountdata.data.data });
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>TÀI KHOẢN CÔNG TY</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Thêm hóa đơn tài khoản công ty</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="email_address">Công ty</label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              className="form-control show-tick"
                              name="company_id"
                              id="company_id"
                            >
                              {this.state.companylist.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="email_address">Loại giao dịch</label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              id="transaction_type"
                              name="transaction_type"
                              className="form-control"
                            >
                              <option value="1">Tài khoản ghi nợ</option>
                              <option value="2">Tài khoản tín dụng</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="email_address">Số giao dịch </label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="transaction_amt"
                              name="transaction_amt"
                              className="form-control"
                              placeholder="Số giao dịch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="email_address">Ngày Giao dịch</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="transaction_date"
                              name="transaction_date"
                              className="form-control"
                              placeholder="Ngày Giao dịch"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="email_address">
                          Phương thức thanh toán
                        </label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              id="payment_mode"
                              name="payment_mode"
                              className="form-control"
                            >
                              <option value="1">Tiền mặt</option>
                              <option value="2">Chuyển khoản</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Thêm giao dịch"
                        : "Thêm giao dịch vui lòng đợi .."}
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
                  <h2>Tất cả các giao dịch</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Tên công ty</th>
                        <th>ID công ty</th>
                        <th>Loại giao dịch</th>
                        <th>Số giao dịch</th>
                        <th>Ngày Giao dịch</th>
                        <th>Phương thức thanh toán</th>
                        <th>Đã thêm vào</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyAccountdata.map((companyaccount) => (
                        <tr key={companyaccount.id}>
                          <td>{companyaccount.id}</td>
                          <td>{companyaccount.company.name}</td>
                          <td>{companyaccount.company.id}</td>
                          <td>
                            {companyaccount.transaction_type == 1
                              ? "Debit"
                              : "Credit"}
                          </td>
                          <td>{companyaccount.transaction_amt}</td>
                          <td>{companyaccount.transaction_date}</td>
                          <td>{companyaccount.payment_mode}</td>
                          <td>
                            {new Date(companyaccount.added_on).toLocaleString()}
                          </td>
                        </tr>
                      ))}
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

export default CompanyAccountComponent;
