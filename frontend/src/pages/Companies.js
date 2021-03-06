import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import LemonDivider from '../components/main/LemonDivider';
import AuthContext from '../context/AuthContext';
const backendURL = process.env.REACT_APP_BACKENDURL;

const Companies = () => {
  const [companies, setCompanies] = useState();
  const [isOpenCompany, setIsOpenCompany] = useState(false);

  const {setBuy} = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    axios.get(`${backendURL}/api/companies`).then((data) => {
      setCompanies(data.data.companies);
    });
  }, []);

  const createRating = (company) => {
    const rating = company.sustainability_rating;
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(1);
    }
    return stars;
  };

  return (
    <Layout>
      <div className="flex flex-row justify-center gap-4 my-12 flex-wrap lg:flex-nowwrap">
        {companies &&
          companies.map((company) => {
            return (
              <div
                key={company._id}
                className="flex flex-col m-4 w-52 text-center"
              >
                <div className="my-6 w-32 h-32 bg-alabaster rounded-full shadow mx-auto">
                  <img
                    src={company.logo}
                    alt="company"
                    className="w-28 h-28 rounded-full shadow object-cover mx-auto"
                  />
                </div>
                <div className="mt-4 relative">
                  <img
                    src="https://res.cloudinary.com/dq66nu4hm/image/upload/v1637357856/lemon-squeezy/Brush_Stroke-1_xi5uot.png"
                    alt="underline"
                    className="absolute bottom-0 -left-6 z-0 h-6 w-52"
                  />
                  <h2 className="absolute -bottom-1 z-2 text-offWhite">
                    {company.name}
                  </h2>
                </div>
                <div className="flex flex-row mx-2 mt-2 gap-2 items-center">
                  {createRating(company).map(() => {
                    return (
                      <img
                        src="https://res.cloudinary.com/dq66nu4hm/image/upload/v1637356036/lemon-squeezy/star_d9s8jn.png"
                        alt="rating"
                        className="w-6 h-6"
                      />
                    );
                  })}
                </div>
                <div className="mt-6 mb-2">({company.founded_in})</div>
                <button
                  type="button"
                  className="self-center smallButton p-2 my-4"
                  onClick={() => {
                    setIsOpenCompany(company);
                  }}
                >
                  Choose
                </button>
              </div>
            );
          })}
      </div>
      {isOpenCompany && (
        <>
          <LemonDivider />
          <div className="text-center mx-2 my-12">
            <h1 className="underline">{isOpenCompany.name}</h1>
            <div>{isOpenCompany.description}</div>
            <div className="flex flex-col items-center mb-10">
              <div className="my-2 text-lg font-bold">
                Sustainability Rating:
              </div>
              <div className="flex flex-row mt-2 gap-2 items-center">
                {createRating(isOpenCompany).map(() => {
                  return (
                    <img
                      src="https://res.cloudinary.com/dq66nu4hm/image/upload/v1637356036/lemon-squeezy/star_d9s8jn.png"
                      alt="rating"
                      className="w-6 h-6"
                    />
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => {
                setBuy(isOpenCompany);
                history.push('/buyshare');
              }}
              className="smallButton p-2"
            >
              Buy Shares
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Companies;
