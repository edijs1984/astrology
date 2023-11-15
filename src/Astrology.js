import axios from "axios";
import * as getSign from "horoscope";
import { useEffect, useState } from "react";
const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
};

const inputStyle = {
  margin: 10,
  height: 40,
  width: 100,
  background: "none",
  border: "none",
  borderBottom: "1px solid #6536c9",
  color: "white",
};

export default function Astrology() {
  const [firstZodiac, setFirstZodiac] = useState();
  const [secondZodiac, setSecondZodiac] = useState();

  const [firstPerson, setFirstPerson] = useState({
    p_day: "",
    p_month: "",
    p_year: "",
    p_hour: "",
    p_min: "",
  });
  const [secondPerson, setSecondPerson] = useState({
    s_day: "",
    s_month: "",
    s_year: "",
    s_hour: "",
    s_min: "",
  });
  const formData = {
    p_year: firstPerson.p_year,
    p_month: firstPerson.p_hour,
    p_day: firstPerson.p_day,
    p_hour: 1,
    p_min: 10,
    p_lat: 56.8,
    p_lon: 24.6,
    p_tzone: 2.5,
    s_year: secondPerson.s_year,
    s_month: secondPerson.s_month,
    s_day: secondPerson.s_day,
    s_hour: 15,
    s_min: 25,
    s_lat: 56.8,
    s_lon: 24.6,
    s_tzone: 2.5,
  };
  const [result, setResult] = useState();
  const username = 626602;
  const password = "4996a5a1a14154de07c6b78b0a661514";

  // Encode the credentials to Base64
  const credentials = btoa(`${username}:${password}`);
  const handlePChange = (key, value) => {
    setFirstPerson((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSChange = (key, value) => {
    setSecondPerson((prevState) => ({ ...prevState, [key]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        method: "post",
        url: `https://json.astrologyapi.com/v1/zodiac_compatibility/${firstZodiac}/${secondZodiac}`,
        data: formData,
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setResult(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  function setZodiac(zodiac, firstOrSecond) {
    if (firstOrSecond === 1) {
      setFirstZodiac(zodiac);
    }
    setSecondZodiac(zodiac);
  }

  useEffect(() => {
    if (firstPerson.p_month !== "" && firstPerson.p_day !== "") {
      const sign = getSign.getSign({
        month: parseInt(firstPerson.p_month),
        day: parseInt(firstPerson.p_day),
      });
      setZodiac(sign, 1);
    }
    if (secondPerson.s_month !== "" && secondPerson.s_day !== "") {
      const sign = getSign.getSign({
        month: parseInt(secondPerson.s_month),
        day: parseInt(secondPerson.s_day),
      });
      setZodiac(sign, 2);
    }
  }, [
    firstPerson.p_month,
    firstPerson.p_day,
    secondPerson.s_month,
    secondPerson.s_day,
  ]);

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={{ fontFamily: "sans-serif", fontSize: 24 }}>Your data</div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <select
          value={firstPerson.p_year}
          onChange={(e) => handlePChange("p_year", e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled selected>
            Year
          </option>
          {Array.from(
            { length: 2005 - 1920 + 1 },
            (_, index) => 2005 - index
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={firstPerson.p_year} // Make sure this should be p_month if you are tracking the month
          onChange={(e) => handlePChange("p_month", e.target.value)}
          required
          style={inputStyle}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={firstPerson.p_day}
          onChange={(e) => handlePChange("p_day", e.target.value)}
          required
          style={inputStyle}
          placeholder="Day"
        >
          <option value="" disabled selected>
            Day
          </option>
          {Array.from({ length: 31 }, (_, index) => 1 + index).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={{ fontFamily: "sans-serif", fontSize: 24, marginTop: 10 }}>
        Partners data
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <select
          value={secondPerson.s_year}
          onChange={(e) => handleSChange("s_year", e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled selected>
            Year
          </option>
          {Array.from(
            { length: 2005 - 1920 + 1 },
            (_, index) => 2005 - index
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={secondPerson.s_year} // Make sure this should be p_month if you are tracking the month
          onChange={(e) => handleSChange("s_month", e.target.value)}
          required
          style={inputStyle}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={secondPerson.s_day}
          onChange={(e) => handleSChange("s_day", e.target.value)}
          required
          style={inputStyle}
          placeholder="Day"
        >
          <option value="" disabled selected>
            Day
          </option>
          {Array.from({ length: 31 }, (_, index) => 1 + index).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        style={{
          width: 300,
          margin: 20,
          height: 50,
          borderRadius: 5,
          backgroundColor: "#6536c9",
          color: "white",
        }}
      >
        Calculate compatibility
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-center",
        }}
      >
        <label style={{ fontFamily: "sans-serif", fontSize: 20 }}>
          Compatibility report
        </label>
        <textarea
          value={result ? result.compatibility_report : ""}
          readOnly
          style={{
            width: 400,
            height: 200,
            fontSize: 14,
            fontFamily: "sans-serif",
            marginTop: "5px", // Add some spacing between label and textarea
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2%",
        }}
      >
        <label
          style={{ fontSize: 15, fontFamily: "sans-serif", color: "white" }}
        >
          Your sign
        </label>
        <textarea
          value={result ? result.your_sign : ""}
          readOnly
          style={{
            width: 400,
            height: 20,
            margin: "3%",
            fontSize: 14,
            fontFamily: "sans-serif",
          }}
        />
        <label
          style={{
            fontSize: 15,
            fontFamily: "sans-serif",
            color: "white",
            padding: "2%",
          }}
        >
          Partner sign
        </label>
        <textarea
          value={result ? result.your_partner_sign : ""}
          readOnly
          style={{
            width: 400,
            height: 20,

            fontSize: 14,
            fontFamily: "sans-serif",
          }}
        />
      </div>
      <label
        style={{
          fontSize: 15,
          fontFamily: "sans-serif",
          color: "white",
          padding: "2%",
        }}
      >
        Compatibility percent
      </label>
      <textarea
        value={result ? result.compatibility_percentage : ""}
        readOnly
        style={{
          width: 400,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
          fontSize: 14,
          fontFamily: "sans-serif",
        }}
      />
    </form>
  );
}
