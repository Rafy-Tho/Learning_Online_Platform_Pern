// Source - https://stackoverflow.com/q/71230965
// Posted by Wambura
// Retrieved 2026-04-01, License - CC BY-SA 4.0

import React, { useContext, useEffect, useState } from "react";
import { Global } from "../../../shared/utilities/scripts/global.context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./nanny.complete.profile.css";

const radioStyle = {
  color: "#9695b9",
  "&.Mui-checked": {
    color: "#9695b9",
  },
};

const Radius = () => {
  //to translate page
  const { t } = useTranslation();

  const { radioSelected, setRadioSelected } = useContext(Global);
  const { values, setValues } = useContext(Global);
  const [disabled, setDisabled] = useState(true);

  //get state from localStorage to persist
  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("values"));
    if (values.radius === "") {
      setValues((values) => ({ ...values, ...localState }));
    }
  }, []);

  useEffect(() => {
    const localDisabled = JSON.parse(localStorage.getItem("disabled"));
    if (values.radius === "") {
      setDisabled(localDisabled);
    } else {
      setDisabled(!localDisabled);
    }
  });

  //setting localStorage
  useEffect(() => {
    localStorage.setItem("values", JSON.stringify(values));
  }, [values.radius]);

  useEffect(() => {
    localStorage.setItem("disabled", JSON.stringify(disabled));
  }, []);

  const handleRadio = (e) => {
    const { name, value } = e.target;

    setRadioSelected(value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const controlProps = (item) => ({
    checked: radioSelected === item,
    onChange: handleRadio,
    value: item,
    name: "radius",
    inputProps: { "aria-label": item },
  });

  return (
    <div className="sub-settings-div">
      <Link className="back" to="/vaccination">
        <span>
          <ArrowBackIcon />
        </span>
        Back
      </Link>
      <h3 className="sub-settings-header">{t("common.title")}</h3>
      <h2 className="sub-settings-sub-header">{t("radius.subTitle")}</h2>
      <div className="radio-container">
        <div className="radio-item">
          <Radio
            className="radio"
            sx={radioStyle}
            {...controlProps("0-5 km")}
          />
          <div className="labels">
            <label className="label">
              0-5 km
              <p>
                {" "}
                {`(${t("radius.car")}: 5-10 mins / ${t(
                  "radius.bike",
                )}: 15-20 mins)`}
              </p>
            </label>
          </div>
        </div>
        <div className="radio-item">
          <Radio
            className="radio"
            sx={radioStyle}
            {...controlProps("5-10 km")}
          />
          <div className="labels">
            <label className="label">
              5-10 km
              <p>
                {" "}
                {`(${t("radius.car")}: 10-20 mins / ${t(
                  "radius.bike",
                )}: 20-35 mins)`}
              </p>
            </label>
          </div>
        </div>
        <div className="radio-item">
          <Radio
            className="radio"
            sx={radioStyle}
            {...controlProps("10-20 km")}
          />
          <div className="labels">
            <label className="label">
              10-20 km
              <p>
                {" "}
                {`(${t("radius.car")}: 20-30 mins / ${t(
                  "radius.bike",
                )}: 35-50 mins)`}
              </p>
            </label>
          </div>
        </div>
        <div className="radio-item">
          <Radio
            className="radio"
            sx={radioStyle}
            {...controlProps("20-50 km")}
          />
          <div className="labels">
            <label className="label">
              20-50 km
              <p>
                {" "}
                {`(${t("radius.car")}: 30-60 mins > ${t("radius.recommend")})`}
              </p>
            </label>
          </div>
        </div>
      </div>
      <div className="nav-btns">
        <Link to="/vaccination" className="prev-link">
          <button className="prev">{t("buttons.back")}</button>
        </Link>
        <Link to="/booked" className="next-link">
          <button
            disabled={disabled ? true : false}
            className={disabled ? "disabled" : "next"}
          >
            {t("buttons.next")}
            <span>
              <ArrowForwardIcon />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Radius;
