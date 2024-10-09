import { useSelector } from "react-redux";

const Header = () => {
  const { amount } = useSelector((state) => state.income);

  return (
    <header className="py-6 container mx-auto flex justify-between items-center text-xl sticky top-0 bg-gray-100 z-10">
      <div className="flex gap-x-16 items-center">
        <div className="logo text-2xl font-bold text-blue-200">Logo</div>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a href="#income" className="text-gray-600 hover:text-blue-200">
                Income & Expense
              </a>
            </li>
            <li>
              <a
                href="#budgeting"
                className="text-gray-600 hover:text-blue-200"
              >
                Budgeting Tool
              </a>
            </li>
            <li>
              <a href="#goals" className="text-gray-600 hover:text-blue-200">
                Saving Goals
              </a>
            </li>
            <li>
              <a href="#reports" className="text-gray-600 hover:text-blue-200">
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="auth-links flex items-center space-x-4">
        <div className="flex items-center gap-x-2 border border-yellow-500 rounded-full pr-4">
          <svg
            width="30px"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="none" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V7.10139C9.40464 7.43925 8.375 8.58587 8.375 10C8.375 11.4141 9.40463 12.5607 11 12.8986V14.789C10.5435 14.595 10.219 14.3039 10.2015 14.2873C9.81056 13.9024 9.18159 13.9042 8.79293 14.2929C8.4024 14.6834 8.40239 15.3166 8.79291 15.7071C9.05517 15.969 9.37099 16.1852 9.69138 16.3682C10.0315 16.5626 10.4745 16.7635 11 16.8851V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V16.8986C14.5954 16.5607 15.625 15.4141 15.625 14C15.625 12.5859 14.5954 11.4393 13 11.1014V9.16492C13.4727 9.339 13.6825 9.58115 13.7085 9.61119C14.0401 10.0402 14.6562 10.1281 15.0944 9.80419C15.5385 9.47592 15.6325 8.84977 15.3042 8.40562C15.3042 8.40562 15.3047 8.40635 15.3035 8.40472C15.2396 8.31864 15.1726 8.24151 15.0527 8.1254C14.9108 7.98796 14.707 7.81664 14.4357 7.64913C14.0715 7.42421 13.5949 7.21225 13 7.0949V7ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
              fill="#f2b818"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1252 13.2457C13.0682 13.2126 13 13.2562 13 13.3222V14.6779C13 14.7439 13.0682 14.7875 13.1252 14.7543V14.7543C13.52 14.5248 13.6249 14.19 13.6249 14C13.6249 13.8101 13.52 13.4752 13.1252 13.2457V13.2457Z"
              fill="#f2b818"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 9.33969C11 9.26548 10.9233 9.21647 10.8597 9.25462V9.25462C10.4773 9.48379 10.375 9.81251 10.375 10C10.375 10.1875 10.4773 10.5162 10.8597 10.7454V10.7454C10.9233 10.7835 11 10.7345 11 10.6603V9.33969Z"
              fill="#f2b818"
            />
          </svg>
          {amount.toLocaleString("en-IN")}
        </div>
        <a
          href="#"
          className="text-gray-600 py-3 px-3 hover:text-blue-200 font-semibold"
        >
          Sign In
        </a>
        <a
          href="#"
          className="bg-blue-200 text-white py-3 px-6 rounded-lg hover:bg-blue-500 font-semibold"
        >
          Sign Up
        </a>
      </div>
    </header>
  );
};

export default Header;
