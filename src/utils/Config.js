class Config {
  //BASE_URL = "https://medicalstoreapi.herokuapp.com/";
  //FOR LIVE URL
  // static loginUrl = "https://medicalstoreapi.herokuapp.com/api/gettoken/";
  // static refreshApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/resfresh_token/";
  // static companyApiUrl = "https://medicalstoreapi.herokuapp.com/api/company/";
  // static homeApiUrl = "https://medicalstoreapi.herokuapp.com/api/home_api/";
  // static customerRequestApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/customer_request/";
  // static medicineNameApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/medicinebyname/";
  // static companyBankApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/companybank/";
  // static generateBillApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/generate_bill_api/";
  // static companyAccountApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/companyaccount/";
  // static companyOnly = "https://medicalstoreapi.herokuapp.com/api/companyonly/";
  // static employeeApiURL = "https://medicalstoreapi.herokuapp.com/api/employee/";
  // static medicineApiUrl = "https://medicalstoreapi.herokuapp.com/api/medicine/";
  // static employeeBankApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/employee_all_bank/";
  // static employeeBankApiUrlBYID =
  //   "https://medicalstoreapi.herokuapp.com/api/employee_bankby_id/";
  // static employeeSalaryApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/employee_all_salary/";
  // static employeeSalaryByIdApiUrl =
  //   "https://medicalstoreapi.herokuapp.com/api/employee_salaryby_id/";

  //FOR TEST URL
  static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
  static refreshApiUrl = "http://127.0.0.1:8000/api/resfresh_token/";
  static companyApiUrl = "http://127.0.0.1:8000/api/company/";
  static homeApiUrl = "http://127.0.0.1:8000/api/home_api/";
  static customerRequestApiUrl = "http://127.0.0.1:8000/api/customer_request/";
  static medicineNameApiUrl = "http://127.0.0.1:8000/api/medicinebyname/";
  static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/";
  static generateBillApiUrl = "http://127.0.0.1:8000/api/generate_bill_api/";
  static companyAccountApiUrl = "http://127.0.0.1:8000/api/companyaccount/";
  static companyOnly = "http://127.0.0.1:8000/api/companyonly/";
  static employeeApiURL = "http://127.0.0.1:8000/api/employee/";
  static medicineApiUrl = "http://127.0.0.1:8000/api/medicine/";
  static employeeBankApiUrl = "http://127.0.0.1:8000/api/employee_all_bank/";
  static employeeBankApiUrlBYID =
    "http://127.0.0.1:8000/api/employee_bankby_id/";
  static employeeSalaryApiUrl =
    "http://127.0.0.1:8000/api/employee_all_salary/";
  static employeeSalaryByIdApiUrl =
    "http://127.0.0.1:8000/api/employee_salaryby_id/";
  static homeUrl = "/home";
  static logoutPageUrl = "/logout";

  static sidebarItem = [
    { index: "0", title: "Trang Ch???", url: "/home", icons: "home" },
    { index: "1", title: "C??ng Ty", url: "/company", icons: "extension" },
    {
      index: "2",
      title: "Th??m lo???i Thu???c",
      url: "/addMedicine",
      icons: "playlist_add",
    },
    {
      index: "3",
      title: "Qu???n l?? Thu???c",
      url: "/manageMedicine",
      icons: "dashboard",
    },
    {
      index: "4",
      title: "Qu???n l?? T??i Kho???n",
      url: "/manageCompanyAccount",
      icons: "bookmark",
    },
    {
      index: "5",
      title: "Qu???n l?? nh??n vi??n",
      url: "/employeeManage",
      icons: "account_box",
    },
    {
      index: "6",
      title: "T???o h??a ????n",
      url: "/generateBill",
      icons: "assessment",
    },
    {
      index: "7",
      title: "Kh??ch h??ng",
      url: "/customerRequest",
      icons: "accessibility",
    },
  ];
}

export default Config;
