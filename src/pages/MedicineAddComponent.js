import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class MedicineAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companylist: [],
    medicinedetails: [
      { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
    ],
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new APIHandler();
    var response = await apiHandler.saveMedicineData(
      event.target.name.value,
      event.target.medical_typ.value,
      event.target.buy_price.value,
      event.target.sell_price.value,
      event.target.c_gst.value,
      event.target.s_gst.value,
      event.target.batch_no.value,
      event.target.shelf_no.value,
      event.target.expire_date.value,
      event.target.mfg_date.value,
      event.target.company_id.value,
      event.target.description1.value,
      event.target.in_stock_total.value,
      event.target.qty_in_strip.value,
      this.state.medicinedetails
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  componentDidMount() {
    this.LoadCompany();
  }

  async LoadCompany() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchCompanyOnly();
    this.setState({ companylist: companydata.data });
  }

  RemoveItems = () => {
    if (this.state.medicinedetails.length != 1) {
      this.state.medicinedetails.pop(this.state.medicinedetails.length - 1);
    }
    this.setState({});
  };

  handleInput = (event) => {
    var keyname = event.target.name;
    var value = event.target.value;
    var index = event.target.getAttribute("data-index");
    this.state.medicinedetails[index][keyname] = value;
    this.setState({});
    console.log(this.state.medicinedetails);
  };

  AddItem = () => {
    var item = {
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    };

    this.state.medicinedetails.push(item);
    this.setState({});
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Th??m lo???i Thu???c</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Th??m lo???i Thu???c</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="email_address">T??n Thu???c</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="T??n Thu???c"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Lo???i thu???c</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_typ"
                          name="medical_typ"
                          className="form-control"
                          placeholder="Lo???i thu???c"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Gi?? mua</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Gi?? mua"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Gi?? b??n</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Gi?? b??n"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">C GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="c_gst"
                          name="c_gst"
                          className="form-control"
                          placeholder="Thu??? gi?? tr???"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">S GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="s_gst"
                          name="s_gst"
                          className="form-control"
                          placeholder="Thu??? gi?? tr???"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">S??? l??</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch_no"
                          name="batch_no"
                          className="form-control"
                          placeholder="S??? l??"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">S??? k???</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="S??? k???"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">H???n s??? d???ng</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          placeholder="H???n s??? d???ng"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">Ng??y s???n xu???t</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          placeholder="Ng??y s???n xu???t"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">M?? t???</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description1"
                          name="description1"
                          className="form-control"
                          placeholder="M?? t???"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">T???ng s???</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          placeholder="C??n h??ng T???ng s???"
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">S??? l?????ng </label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          placeholder="S??? l?????ng "
                        />
                      </div>
                    </div>
                    <label htmlFor="email_address">C??ng ty</label>
                    <div className="form-group">
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
                    <div className="form-group">
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-success"
                          onClick={this.AddItem}
                          type="button"
                        >
                          Th??m chi ti???t
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-danger"
                          type="button"
                          onClick={this.RemoveItems}
                        >
                          Lo???i b??? chi ti???t
                        </button>
                      </div>
                    </div>
                    {this.state.medicinedetails.map((item, index) => (
                      <div className="form-group row" key={index}>
                        <div className="col-lg-3">
                          <label htmlFor="email_address">T??n Salt</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_name"
                              name="salt_name"
                              className="form-control"
                              placeholder="Salt"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="email_address">Salt Qty</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty"
                              name="salt_qty"
                              className="form-control"
                              placeholder="Salt Qty"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="email_address">Salt Qty Type</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty_type"
                              name="salt_qty_type"
                              className="form-control"
                              placeholder="Salt Qty Type"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="email_address">M?? t???</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="description"
                              name="description"
                              className="form-control"
                              placeholder="M?? t???"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Th??m lo???i Thu???c"
                        : "Th??m lo???i Thu???c vui l??ng ?????i..."}
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
        </div>
      </section>
    );
  }
}

export default MedicineAddComponent;
