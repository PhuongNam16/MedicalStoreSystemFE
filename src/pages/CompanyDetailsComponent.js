import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class CompanyDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    console.log(props.match.params.id);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyBank: [],
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.editCompanyData(
      event.target.name.value,
      event.target.license_no.value,
      event.target.address.value,
      event.target.contact_no.value,
      event.target.email.value,
      event.target.description.value,
      this.props.match.params.id
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  //This Method Work When Our Page is Ready
  componentDidMount() {
    this.fetchCompanyData();
  }

  async fetchCompanyData() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchCompanyDetails(
      this.props.match.params.id
    );
    console.log(companydata);
    this.setState({ companyBank: companydata.data.data.company_bank });
    this.setState({ name: companydata.data.data.name });
    this.setState({ license_no: companydata.data.data.license_no });
    this.setState({ address: companydata.data.data.address });
    this.setState({ contact_no: companydata.data.data.contact_no });
    this.setState({ email: companydata.data.data.email });
    this.setState({ description: companydata.data.data.description });
    this.setState({ dataLoaded: true });
  }

  viewCompanyDetails = (company_id) => {
    console.log(company_id);
    console.log(this.props);
  };

  AddCompanyBank = () => {
    this.props.history.push("/addCompanyBank/" + this.props.match.params.id);
  };

  EditCompanyBank = (company_bank_id) => {
    console.log(company_bank_id);
    this.props.history.push(
      "/editcompanybank/" + this.props.match.params.id + "/" + company_bank_id
    );
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Thông tin chi tiết</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded == false ? (
                    <div className="text-center">
                      <div class="preloader pl-size-xl">
                        <div class="spinner-layer">
                          <div class="circle-clipper left">
                            <div class="circle"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>Sửa Thông Tin</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="text">Tên công ty</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Nhập tên công ty"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>
                    <label htmlFor="text">Số giấy phép</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Nhập số giấy phép"
                          defaultValue={this.state.license_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Địa chỉ</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Nhập địa chỉ"
                          defaultValue={this.state.address}
                        />
                      </div>
                    </div>
                    <label htmlFor="text">Số liên hệ</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact_no"
                          name="contact_no"
                          className="form-control"
                          placeholder="Nhập số liên hệ"
                          defaultValue={this.state.contact_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Nhập email"
                          defaultValue={this.state.email}
                        />
                      </div>
                    </div>
                    <label htmlFor="text">Mô tả</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Nhập mô tả"
                          defaultValue={this.state.description}
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
                        ? "Thêm công ty"
                        : "Thêm công ty vui lòng đợi..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Thêm thành công!</strong>{" "}
                        {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Thêm thất bại!</strong>
                        {this.state.errorMessage}.
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
                      <div class="preloader pl-size-xl">
                        <div class="spinner-layer">
                          <div class="circle-clipper left">
                            <div class="circle"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>Công ty</h2>
                  <div className="header-dropdown m-r--5">
                    <button
                      className="btn btn-info"
                      onClick={this.AddCompanyBank}
                    >
                      Thêm Công Ty
                    </button>
                  </div>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Số tài khoản</th>
                        <th>Mã số ngân hàng</th>
                        <th>Thời gian vào</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyBank.map((company) => (
                        <tr key={company.id}>
                          <td>{company.id}</td>
                          <td>{company.bank_account_no}</td>
                          <td>{company.ifsc_no}</td>
                          <td>{new Date(company.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() => this.EditCompanyBank(company.id)}
                            >
                              Sửa
                            </button>
                            <button className="btn btn-block btn-danger">
                              Xóa
                            </button>
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

export default CompanyDetailsComponent;
